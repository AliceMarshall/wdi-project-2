const { env } = require('./environment');

module.exports = {
  github: {
    loginURL: 'https://github.com/login/oauth/authorize',
    accessTokenURL: 'https://github.com/login/oauth/access_token',
    profileURL: 'https://api.github.com/user',
    clientId: process.env.PROJECT2_GIT_CLIENT_ID,
    clientSecret: process.env.PROJECT2_GIT_CLIENT_SECRET,
    scope: 'user:email',
    getLoginURL() {
      return `${this.loginURL}?client_id=${this.clientId}&scope=${this.scope}`;
    }
  },
  facebook: {
    loginURL: 'https://www.facebook.com/v2.8/dialog/oauth',
    accessTokenURL: 'https://graph.facebook.com/v2.8/oauth/access_token',
    profileURL: '#',
    clientId: process.env.PROJECT2_FB_CLIENT_ID,
    clientSecret: process.env.PROJECT2_FB_CLIENT_SECRET,
    redirect_URI: env === 'production' ? 'https://evening-crag-17922.herokuapp.com/oauth/facebook' : 'http://localhost:3000/oauth/facebook',
    scope: 'user:email',
    getLoginURL() {
      return `${this.loginURL}?client_id=${this.clientId}&redirect_uri=${this.redirect_URI}`;
    }
  }
};
