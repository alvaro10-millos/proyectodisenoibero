const { openDb } = require("../database/db");

class CitasModel {

  static async obtenerTodas() {
    const db = await openDb();
    return db.all(`
      SELECT 
        c.id,
        c.fecha,
        c.hora,
        c.estado,
        s.nombre AS servicio
      FROM citas c
      JOIN servicios s ON s.id = c.servicio_id
      ORDER BY c.fecha, c.hora
    `);
  }

  static async contar() {
    const db = await openDb();
    return db.get(`SELECT COUNT(*) AS total FROM citas`);
  }

  static async contarPorEstado(estado) {
    const db = await openDb();
    return db.get(
      `SELECT COUNT(*) AS total FROM citas WHERE estado = ?`,
      [estado]
    );
  }
}

module.exports = CitasModel;
