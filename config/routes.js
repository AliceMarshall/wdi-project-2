const router = require('express').Router();
const registrations = require('../controllers/registrations');
const sessions = require('../controllers/sessions');
const secureRoute = require('../lib/secureRoute');
const designs = require('../controllers/designs');
const users = require('../controllers/users');
const oauth = require('../controllers/oauth');
const upload = require('../lib/upload');

router.get('/', (req, res) => res.render('statics/index'));

router.route('/users')
  .get(users.indexUser);

router.route('/users/:id')
  .get(users.showUser)
  .put(secureRoute, users.updateUser)
  .delete(secureRoute, users.deleteUser)
  .post(secureRoute, users.createDesign);

router.route('/users/:id/edit')
  .get(secureRoute, users.editUser);

router.route('/users/:id/designs/new')
  .get(secureRoute, users.newDesign);

router.route('/users/:id/designs/:designId')
  .get(users.showDesign)
  .put(secureRoute, users.updateDesign);
  // .delete(users.deleteDesign);

router.route('/users/:id/designs/:designId/edit')
  .get(secureRoute, users.editDesign);

router.route('/users/:id/designs/:designId/comments')
  .post(secureRoute, designs.createComment);

router.route('/users/:id/designs/:designId/comments/:commentId')
  .delete(secureRoute, designs.deleteComment);

router.route('/register')
  .get(registrations.new)
  .post(upload.single('profileImage'), registrations.create);

router.route('/login')
  .get(sessions.new)
  .post(sessions.create);

router.route('/logout')
  .get(sessions.delete);

router.route('/oauth/github')
  .get(oauth.github);

router.route('/oauth/facebook')
  .get(oauth.facebook);

router.all('*', (req, res) => res.notFound());

module.exports = router;
