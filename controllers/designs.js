const Design = require('../models/design');

function indexRoute(req, res, next) {
  Design
    .find()
    .populate('createdBy')
    .exec()
    .then((designs) => res.render('designs/index', { designs }))
    .catch(next);
}

function newRoute(req, res) {
  return res.render('designs/new');
}

function createRoute(req, res, next) {

  req.body.createdBy = req.user;

  Design
    .create(req.body)
    .then(() => res.redirect('/designs'))
    .catch((err) => {
      if(err.name === 'ValidationError') return res.badRequest(`/designs/${req.params.id}/edit`, err.toString());
      next(err);
    });
}

function showRoute(req, res, next) {
  Design
    .findById(req.params.id)
    .populate('createdBy comments.createdBy')
    .exec()
    .then((design) => {
      if(!design) return res.notFound();
      return res.render('designs/show', { design });
    })
    .catch(next);
}

function editRoute(req, res, next) {
  Design
    .findById(req.params.id)
    .exec()
    .then((design) => {
      return res.render('designs/edit', { design });
    })
    .catch(next);
}

function updateRoute(req, res, next) {
  Design
    .findById(req.params.id)
    .exec()
    .then((design) => {
      if(!design) return res.notFound();

      for(const field in req.body) {
        design[field] = req.body[field];
      }

      return design.save();
    })
    .then(() => res.redirect(`/designs/${req.params.id}`))
    .catch((err) => {
      if(err.name === 'ValidationError') return res.badRequest(`/designs/${req.params.id}/edit`, err.toString());
      next(err);
    });
}

function deleteRoute(req, res, next) {
  Design
    .findById(req.params.id)
    .exec()
    .then((design) => {
      if(!design) return res.notFound();
      return design.remove();
    })
    .then(() => res.redirect('/designs'))
    .catch(next);
}

function createCommentRoute(req, res, next) {

  req.body.createdBy = req.user;

  Design
    .findById(req.params.id)
    .exec()
    .then((design) => {
      if(!design) return res.notFound();

      design.comments.push(req.body); // create an embedded record
      return design.save();
    })
    .then((design) => res.redirect(`/designs/${design.id}`))
    .catch(next);
}

function deleteCommentRoute(req, res, next) {
  Design
    .findById(req.params.id)
    .exec()
    .then((design) => {
      if (!design) return res.notFound();
      const comment = design.comments.id(req.params.commentId);
      comment.remove();

      return design.save();
    })
    .then((design) => res.redirect(`/designs/${design.id}`))
    .catch(next);
}

module.exports = {
  index: indexRoute,
  new: newRoute,
  create: createRoute,
  show: showRoute,
  edit: editRoute,
  update: updateRoute,
  delete: deleteRoute,
  createComment: createCommentRoute,
  deleteComment: deleteCommentRoute
};
