const mongoose = require('mongoose');
const s3 = require('../lib/s3');

const commentSchema = new mongoose.Schema({
  content: { type: String, required: true },
  createdBy: { type: mongoose.Schema.ObjectId, ref: 'User', required: true }
}, {
  timestamps: true
});

commentSchema.methods.ownedBy = function ownedBy(user) {
  if(typeof this.createdBy.id === 'string') return this.createdBy.id === user.id;
  return user.id === this.createdBy.toString();
};


const designSchema = new mongoose.Schema({
  name: { type: String, required: true },
  technique: { type: String, required: true },
  image: { type: String, required: true },
  difficulty: { type: String, required: true },
  size: { type: String, required: true },
  comments: [ commentSchema ]
});

designSchema.virtual('imageSRC')
  .get(function getImageSRC(){
    if(!this.image) return null;
    if(this.image.match(/^http/)) return this.image;
    return `https://s3-eu-west-1.amazonaws.com/wdi-ldn-project-2/${this.image}`;
  });

designSchema.pre('remove', function removeImage(next) {
  s3.deleteObject({ Key: this.image }, next);
});

module.exports = designSchema;
