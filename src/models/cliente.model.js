const { openDb } = require("../database/db.js");

class ClienteModel {

  static async crearCliente(data) {
    const db = await openDb();
    const { nombre, email, password, telefono } = data;

    await db.run(
      `INSERT INTO clientes (nombre, email, password, telefono, fecha_registro)
       VALUES (?, ?, ?, ?, datetime('now'))`,
      [nombre, email, password, telefono]
    );
  }

  static async buscarPorEmail(email) {
    const db = await openDb();
    return db.get(
      `SELECT id, nombre, email, telefono, password, rol 
       FROM clientes 
       WHERE email = ?`,
      [email]
    );
  }

  static async actualizarPerfil(id, datos) {
    const db = await openDb();
    await db.run(
      `UPDATE clientes
       SET nombre = ?, email = ?, telefono = ?
       WHERE id = ?`,
      [datos.nombre, datos.email, datos.telefono, id]
    );
  }
}

module.exports = { ClienteModel };