function requireAdmin(req, res, next) {
  if (!req.session.user || req.session.user.rol !== 'admin') {
    return res.status(403).render("403", {
      title: "Acceso denegado",
      message: "No tienes permisos para acceder a esta sección"
    });
  }

  next();
}

module.exports = { requireAdmin };