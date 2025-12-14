const { ServicioModel } = require("../models/servicio.model");

class ServiciosController {

  static async listar(req, res) {
    const servicios = await ServicioModel.listar();

    res.render("admin/servicios", {
      title: "Gestión de Servicios",
      usuario: req.session.user,
      servicios
    });
  }

  static async crear(req, res) {
    const { nombre, descripcion, duracion, precio } = req.body;

    if (!nombre || !duracion || !precio) {
      return res.redirect("/admin/servicios");
    }

    await ServicioModel.crear({
      nombre,
      descripcion,
      duracion,
      precio
    });

    res.redirect("/admin/servicios");
  }

  static async eliminar(req, res) {
    const { id } = req.params;
    await ServicioModel.eliminar(id);
    res.redirect("/admin/servicios");
  }

}

module.exports = { ServiciosController };