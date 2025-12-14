const { openDb } = require("../database/db");

class EmpleadoModel {

  static async obtenerTodos() {
    const db = await openDb();
    return db.all("SELECT * FROM empleados WHERE activo = 1");
  }

  static async crear({ nombre, especialidad, telefono }) {
    const db = await openDb();
    await db.run(
      `INSERT INTO empleados (nombre, especialidad, telefono)
       VALUES (?, ?, ?)`,
      [nombre, especialidad, telefono]
    );
  }

  static async eliminar(id) {
    const db = await openDb();
    await db.run(
      "UPDATE empleados SET activo = 0 WHERE id = ?",
      [id]
    );
  }

  // Obtener un empleado activo (para asignar citas)
  static async obtenerDisponible() {
    const db = await openDb();
    return db.get(
      "SELECT id FROM empleados WHERE activo = 1 LIMIT 1"
    );
  }
}

module.exports = { EmpleadoModel };