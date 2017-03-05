const router = require('express').Router();
const registrations = require('../controllers/registrations');
const sessions = require('../controllers/sessions');
// const secureRoute = require('../lib/secureRoute');
const designs = require('../controllers/designs');

router.get('/', (req, res) => res.render('statics/index'));

router.route('/designs')
  .get(designs.index)
  .post(designs.create);

router.route('/designs/new')
  .get(designs.new);

router.route('/designs/:id')
  .get(designs.show)
  .put(designs.update)
  .delete(designs.delete);

router.route('/designs/:id/edit')
  .get(designs.edit);

router.route('/register')
  .get(registrations.new)
  .post(registrations.create);

router.route('/login')
  .get(sessions.new)
  .post(sessions.create);

router.route('/logout')
  .get(sessions.delete);

router.all('*', (req, res) => res.notFound());

module.exports = router;
