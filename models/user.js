const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const designSchema = require('./design');
const s3 = require('../lib/s3');

// const imageSchema = new mongoose.Schema({
//   filename: { type: String },
//   caption: { type: String }
// });
//
// imageSchema.virtual('src')
//   .get(function getImageSRC(){
//     if(!this.filename) return null;
//     return `https://s3-eu-west-1.amazonaws.com/wdi-ldn-project-2/${this.filename}`;
//   });

const userSchema = new mongoose.Schema({
  username: { type: String },
  email: { type: String },
  password: { type: String },
  profileImage: { type: String },
  designs: [ designSchema ],
  githubId: { type: Number },
  facebookId: { type: String }
});

userSchema.virtual('profileImageSRC')
  .get(function getProfileImageSRC(){
    if(!this.profileImage) return null;
    if(this.profileImage.match(/^http/)) return this.profileImage;
    return `https://s3-eu-west-1.amazonaws.com/wdi-ldn-project-2/${this.profileImage}`;
  });

userSchema.pre('remove', function removeImage(next) {
  s3.deleteObject({ Key: this.profileImage }, next);
});

userSchema
  .virtual('passwordConfirmation')
  .set(function setPasswordConfirmation(passwordConfirmation) {
    this._passwordConfirmation = passwordConfirmation;
  });

// lifecycle hook - mongoose middleware
userSchema.pre('validate', function checkPassword(next) {
  if(!this.password && !this.githubId && !this.facebookId) {
    this.invalidate('password', 'required');
  }
  if(this.isModified('password') && this._passwordConfirmation !== this.password) this.invalidate('passwordConfirmation', 'does not match');
  next();
});

userSchema.pre('save', function hashPassword(next) {
  if (this.isModified('password')) {
    this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync(8));
  }
  next();
});

userSchema.methods.validatePassword = function validatePassword(password) {
  return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('User', userSchema);
