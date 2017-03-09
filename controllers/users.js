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

function newDesignRoute(req, res, next) {
  User
    .findById(req.params.id)
    .exec()
    .then((user) => {
      return res.render('designs/new', { user });
    })
    .catch(next);
}

function createDesignRoute(req, res, next) {
  if(req.file) req.body.image = req.file.key;

  req.body = Object.assign({}, req.body);

  User
    .findById(req.params.id)
    .exec()
    .then((user) => {
      if(!user) return res.notFound();

      user.designs.push(req.body); // create an embedded record
      return user.save();
    })
    .then((user) => res.redirect(`/users/${user.id}`))
    .catch(next);
}

function showDesignRoute(req, res, next) {
  User
    .findById(req.params.id)
    .populate('design.comments.createdBy')
    .exec()
    .then((user) => {
      if(!user) return res.notFound();
      const design = user.designs.id(req.params.designId);
      res.render('designs/show', { user, design });
    })
    .catch(next);
}

function editDesignRoute(req, res, next) {
  User
    .findById(req.params.id)
    .exec()
    .then((user) => {
      const design = user.designs.id(req.params.designId);
      return res.render('designs/edit', { user, design });
    })
    .catch(next);
}

function updateDesignRoute(req, res, next) {
  User
    .findById(req.params.id)
    .exec()
    .then((user) => {
      if(!user) return res.notFound();
      const design = user.designs.id(req.params.designId);

      if(!req.body.image) delete req.body.image;

      for(const field in req.body) {
        design[field] = req.body[field];
      }

      return user.save();
    })
    .then(() => res.redirect(`/users/${req.params.id}/designs/${req.params.designId}`))
    .catch((err) => {
      if(err.name === 'ValidationError') return res.badRequest(`/users/${req.params.id}/designs/${req.params.designId}/edit`, err.toString());
      next(err);
    });
}

function deleteDesignRoute(req, res, next) {
  User
    .findById(req.params.id)
    .exec()
    .then((user) => {
      if(!user) return res.notFound();
      user.designs.pull(req.params.designId);
      return user.save();
    })
    .then((user) => {
      console.log('REMOVED', user);
      res.redirect(`/users/${user.id}`);
    })
    .catch(next);
}

function deleteCommentRoute(req, res, next) {
  User
    .findById(req.params.id)
    .exec()
    .then((user) => {
      if (!user) return res.notFound();
      const design = user.designs.id(req.params.designId);
      const comment = design.comments.id(req.params.commentId);

      comment.remove();
      return user.save();
    })
    .then(() => res.redirect(`/users/${req.params.id}/designs/${req.params.designId}`))
    .catch(next);
}

function createCommentRoute(req, res, next) {

  req.body.createdBy = req.user;

  User
    .findById(req.params.id)
    .exec()
    .then((user) => {
      if(!user) return res.notFound();
      const design = user.designs.id(req.params.designId);

      design.comments.push(req.body);
      return user.save();
    })
    .then(() => res.redirect(`/users/${req.params.id}/designs/${req.params.designId}`))
    .catch(next);
}
module.exports = {
  indexUser: indexRoute,
  showUser: showRoute,
  editUser: editRoute,
  updateUser: updateRoute,
  deleteUser: deleteRoute,
  // newProfileImg: newImageRoute,
  // createProfileImg: createImageRoute,
  newDesign: newDesignRoute,
  createDesign: createDesignRoute,
  showDesign: showDesignRoute,
  editDesign: editDesignRoute,
  updateDesign: updateDesignRoute,
  deleteDesign: deleteDesignRoute,
  createComment: createCommentRoute,
  deleteComment: deleteCommentRoute
};
