const { openDb } = require("../database/db");
const { ServicioModel } = require("../models/servicio.model");
const { EmpleadoModel } = require("../models/empleado.model");

class CitasController {

  // Mostrar formulario con servicios reales
  static async nuevaForm(req, res) {
    const servicios = await ServicioModel.listar();

    res.render("citas/nueva", {
      title: "Agendar cita",
      servicios
    });
  }

  // Crear cita
  static async crear(req, res) {
    const { fecha, hora, servicio_id } = req.body;

    if (!fecha || !hora || !servicio_id) {
      const servicios = await ServicioModel.listar();
      return res.render("citas/nueva", {
        title: "Agendar cita",
        servicios,
        error: "Todos los campos son obligatorios"
      });
    }

    const db = await openDb();

    // Obtener empleado disponible
const empleado = await EmpleadoModel.obtenerDisponible();

if (!empleado) {
  const servicios = await ServicioModel.listar();
  return res.render("citas/nueva", {
    title: "Agendar cita",
    servicios,
    error: "No hay empleados disponibles en este momento"
  });
}

await db.run(
  `INSERT INTO citas (cliente_id, empleado_id, servicio_id, fecha, hora, estado)
   VALUES (?, ?, ?, ?, ?, ?)`,
  [
    req.session.user.id,
    empleado.id,
    servicio_id,
    fecha,
    hora,
    "pendiente"
  ]
);

    res.redirect("/");
  }

  static async confirmar(req, res) {
    const db = await openDb();
    await db.run(
      "UPDATE citas SET estado = 'confirmada' WHERE id = ?",
      [req.params.id]
    );
    res.redirect("/");
  }

  static async cancelar(req, res) {
    const db = await openDb();
    await db.run(
      "UPDATE citas SET estado = 'cancelada' WHERE id = ?",
      [req.params.id]
    );
    res.redirect("/");
  }
}

module.exports = { CitasController };