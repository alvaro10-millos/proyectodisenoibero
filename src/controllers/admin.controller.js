const { openDb } = require("../database/db");

class AdminController {
  static async dashboard(req, res) {
    const db = await openDb();

    const clientes = await db.get(
      "SELECT COUNT(*) AS total FROM clientes"
    );

    const citas = await db.get(
      "SELECT COUNT(*) AS total FROM citas"
    );

    res.render("admin/dashboard", {
      title: "Panel Admin",
      usuario: req.session.user,
      totalClientes: clientes.total,
      totalCitas: citas.total
    });
  }
}

module.exports = { AdminController };