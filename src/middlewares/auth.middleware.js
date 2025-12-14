module.exports.requireAuth = (req, res, next) => {
  if (!req.session.user) {
    return res.redirect("/cliente/login");
  }
  next();
};