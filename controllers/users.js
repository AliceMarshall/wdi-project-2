const User = require('../models/user');

function indexRoute(req, res, next) {
  User
    .find()
    .exec()
    .then((users) => res.render('users/index', { users }))
    .catch(next);
}

function showRoute(req, res, next) {
  User
    .findById(req.params.id)
    .exec()
    .then((user) => {
      if(!user) return res.notFound();
      return res.render('users/show', { user });
    })
    .catch(next);
}

function editRoute(req, res, next) {
  User
    .findById(req.params.id)
    .exec()
    .then((user) => {
      return res.render('users/edit', { user });
    })
    .catch(next);
}

function updateRoute(req, res, next) {
  User
    .findById(req.params.id)
    .exec()
    .then((user) => {
      if(!user) return res.notFound();

      for(const field in req.body) {
        user[field] = req.body[field];
      }

      return user.save();
    })
    .then(() => res.redirect(`/users/${req.params.id}`))
    .catch((err) => {
      if(err.name === 'ValidationError') return res.badRequest(`/users/${req.params.id}/edit`, err.toString());
      next(err);
    });
}

function deleteRoute(req, res, next) {
  User
    .findById(req.params.id)
    .exec()
    .then((user) => {
      if(!user) return res.notFound();
      return user.remove();
    })
    .then(() => res.redirect('/users'))
    .catch(next);
}

function showDesignRoute(req, res, next) {
  User
    .findById(req.params.id)
    // .populate('createdBy designs.createdBy')
    .exec()
    .then((user) => {
      if(!user) return res.notFound();
      return User
              .find({createdBy: user.designs.id})
              .exec()
              .then((design) => {
                res.render('designs/show', { user, design });
              });
    })
    .catch(next);
}

module.exports = {
  indexUser: indexRoute,
  showUser: showRoute,
  editUser: editRoute,
  updateUser: updateRoute,
  deleteUser: deleteRoute,
  showDesign: showDesignRoute
};
