const { openDb } = require("../database/db");

class ServicioModel {

  static async listar() {
    const db = await openDb();
    return db.all("SELECT * FROM servicios");
  }

  static async crear({ nombre, descripcion, duracion, precio }) {
    const db = await openDb();
    await db.run(
      `INSERT INTO servicios (nombre, descripcion, duracion, precio)
       VALUES (?, ?, ?, ?)`,
      [nombre, descripcion, duracion, precio]
    );
  }

  static async eliminar(id) {
    const db = await openDb();
    await db.run("DELETE FROM servicios WHERE id = ?", [id]);
  }

}

module.exports = { ServicioModel };