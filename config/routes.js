const router = require('express').Router();
const registrations = require('../controllers/registrations');
const sessions = require('../controllers/sessions');
const secureRoute = require('../lib/secureRoute');
const users = require('../controllers/users');
const oauth = require('../controllers/oauth');
const upload = require('../lib/upload');

router.get('/', (req, res) => res.render('statics/index'));

router.route('/user/:id')
  .get(users.index)
  .post(secureRoute, users.create);

router.route('/user/:id/newDesign')
  .get(secureRoute, users.new);

router.route('/designs/:id')
  .get(designs.show)
  .put(secureRoute, designs.update)
  .delete(secureRoute, designs.delete);

router.route('/designs/:id/edit')
  .get(secureRoute, designs.edit);

router.route('/designs/:id/comments')
  .post(secureRoute, designs.createComment);

router.route('/designs/:id/comments/:commentId')
  .delete(secureRoute, designs.deleteComment);

router.route('/register')
  .get(registrations.new)
  .post(registrations.create);

router.route('/login')
  .get(sessions.new)
  .post(sessions.create);

router.route('/oauth/github')
  .get(oauth.github);

router.all('*', (req, res) => res.notFound());

module.exports = router;
