const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  content: { type: String, required: true },
  createdBy: { type: mongoose.Schema.ObjectId, ref: 'User', required: true }
}, {
  timestamps: true
});

commentSchema.methods.ownedBy = function ownedBy(user) {
  return this.createdBy.id === user.id;
};

const designSchema = new mongoose.Schema({
  name: { type: String, required: true },
  technique: { type: String, required: true },
  image: { type: String },
  difficulty: { type: Number },
  size: { type: String },
  comments: [ commentSchema ]
});

designSchema.virtual('imageSRC')
  .get(function getImageSRC(){
    if(!this.image) return null;
    if(this.image.match(/^http/)) return this.image;
    return `https://s3-eu-west-1.amazonaws.com/wdi-ldn-project-2/${this.image}`;
  });

module.exports = mongoose.model('Design', designSchema);
