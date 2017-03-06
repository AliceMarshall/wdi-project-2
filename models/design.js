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
  createdBy: { type: mongoose.Schema.ObjectId, ref: 'User', required: true },
  comments: [ commentSchema ]
});

designSchema.methods.ownedBy = function ownedBy(user) {
  return this.createdBy.id === user.id;
};

module.exports = mongoose.model('Design', designSchema);
