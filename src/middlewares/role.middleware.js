const requireAdmin = (req, res, next) => {
  if (!req.session.user) {
    return res.redirect("/cliente/login");
  }

  if (req.session.user.rol !== "admin") {
    return res.status(403).send("Acceso denegado");
  }

  next();
};

module.exports = { requireAdmin };