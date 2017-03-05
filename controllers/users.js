// const User = require('../models/user');
//
// function indexRoute(req, res, next) {
//   User
//     .find()
//     .populate('createdBy')
//     .exec()
//     .then((users) => res.render('users/index', { users }))
//     .catch(next);
// }
//
// function newDesignRoute(req, res) {
//   return res.render('users/newDesign');
// }
//
// function createDesignRoute(req, res, next) {
//   if(req.file) req.body.filename = req.file.key;
//
//   req.body = Object.assign({}, req.body);
//
//   req.user.images.push(req.body);
//
//   req.user
//     .save()
//     .then(() => res.redirect(`/users/${req.params.id}`))
//     .catch((err) => {
//       console.log(err);
//       if(err.name === 'ValidationError') return res.badRequest(`/user/${req.params.id}/new`, err.toString());
//       next(err);
//     });
// }
//
// function showDesignRoute(req, res, next) {
//   User
//     .findById(req.params.id)
//     .populate('comments.createdBy')
//     .exec()
//     .then((user) => {
//       if(!user) return res.notFound();
//       return res.render('users/show', { user });
//     })
//     .catch(next);
// }
//
// function editDesignRoute(req, res, next) {
//   User
//     .findById(req.params.id)
//     .exec()
//     .then((user) => {
//       return res.render('users/edit', { user });
//     })
//     .catch(next);
// }
//
// function updateDesignRoute(req, res, next) {
//   User
//     .findById(req.params.id)
//     .exec()
//     .then((user) => {
//       if(!user) return res.notFound();
//
//       for(const field in req.body) {
//         user[field] = req.body[field];
//       }
//
//       return user.save();
//     })
//     .then(() => res.redirect(`/users/${req.params.id}`))
//     .catch((err) => {
//       if(err.name === 'ValidationError') return res.badRequest(`/users/${req.params.id}/edit`, err.toString());
//       next(err);
//     });
// }
//
// function deleteDesignRoute(req, res, next) {
//   User
//     .findById(req.params.id)
//     .exec()
//     .then((user) => {
//       if(!user) return res.notFound();
//       return user.remove();
//     })
//     .then(() => res.redirect('/users'))
//     .catch(next);
// }
//
// function createCommentRoute(req, res, next) {
//
//   req.body.createdBy = req.user;
//
//   User
//     .findById(req.params.id)
//     .exec()
//     .then((user) => {
//       if(!user) return res.notFound();
//
//       user.comments.push(req.body); // create an embedded record
//       return user.save();
//     })
//     .then((user) => res.redirect(`/users/${user.id}`))
//     .catch(next);
// }
//
// function deleteCommentRoute(req, res, next) {
//   User
//     .findById(req.params.id)
//     .exec()
//     .then((user) => {
//       if (!user) return res.notFound();
//       const comment = user.comments.id(req.params.commentId);
//       comment.remove();
//
//       return user.save();
//     })
//     .then((user) => res.redirect(`/users/${user.id}`))
//     .catch(next);
// }
//
//
// module.exports = {
//   index: indexRoute,
//   new: newDesignRoute,
//   create: createDesignRoute,
//   show: showDesignRoute,
//   edit: editDesignRoute,
//   update: updateDesignRoute,
//   delete: deleteDesignRoute,
//   createComment: createCommentRoute,
//   deleteComment: deleteCommentRoute
// };
