const rp = require('request-promise');
const oauth = require('../config/oauth');
const User = require('../models/user');

function github(req, res, next) {
  return rp({
    method: 'POST',
    url: oauth.github.accessTokenURL,
    qs: {
      client_id: oauth.github.clientId,
      client_secret: oauth.github.clientSecret,
      code: req.query.code
    },
    json: true
  })
  .then((token) => {
    return rp({
      method: 'GET',
      url: oauth.github.profileURL,
      qs: token,
      json: true,
      headers: {
        'User-Agent': 'Request-Promise'
      }
    });
  })
  .then((profile) => {
    return User
      .findOne({ $or: [{ email: profile.email }, { githubId: profile.id }] })
      .then((user) => {
        if(!user) {
          user = new User({
            username: profile.login,
            email: profile.email
          });
        }

        user.githubId = profile.id;
        user.profileImage = profile.avatar_url;
        return user.save();
      });
  })
  .then((user) => {
    req.session.userId = user.id;
    req.session.isAuthenticated = true;

    req.flash('info', `Welcome back, ${user.username}!`);
    res.redirect(`/`);
  })
  .catch(next);
}

function facebook(req, res, next) {
  console.log(oauth.facebook);
  return rp({
    method: 'GET',
    url: oauth.facebook.accessTokenURL,
    qs: {
      client_id: oauth.facebook.clientId,
      redirect_uri: 'https://big-stitch-up.herokuapp.com/oauth/facebook',
      client_secret: oauth.facebook.clientSecret,
      code: req.query.code
    },
    json: true
  })

 .then((token) => {

   return rp.get({
     url: 'https://graph.facebook.com/v2.5/me?fields=id,name,email,picture',
     qs: token,
     json: true
   });
 })
 .then((profile) => {
   console.log(profile);
   return User.findOne({email: profile.email })//first check their emails in case they already exist on our systm
     .then((user) => {
       if(!user) {
         user = new User({
           username: profile.name,
           email: profile.email
         });
       }

       user.facebookId = profile.id;
       user.profileImage = profile.picture.data.url;
       return user.save();
     });
 })
 .then((user) => {
   req.session.userId = user.id;
   req.session.isAuthenticated = true;

   req.flash('info', `welcome back ${user.username}!`);
   res.redirect('/');
 })
 .catch(next);
}

module.exports = { github, facebook };
