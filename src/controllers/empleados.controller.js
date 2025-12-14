const { EmpleadoModel } = require("../models/empleado.model");

class EmpleadosController {

  static async listar(req, res) {
    const empleados = await EmpleadoModel.obtenerTodos();

    res.render("admin/empleados", {
      title: "Gestión de empleados",
      usuario: req.session.user,
      empleados
    });
  }

  static async crear(req, res) {
    const { nombre, especialidad, telefono } = req.body;

    await EmpleadoModel.crear({
      nombre,
      especialidad,
      telefono
    });

    res.redirect("/admin/empleados");
  }

  static async eliminar(req, res) {
    const { id } = req.params;

    await EmpleadoModel.eliminar(id);

    res.redirect("/admin/empleados");
  }
}

module.exports = { EmpleadosController };