const db = require("./db.js");

const createTables = () => {
  
  // Tabla clientes
  db.run(`
    CREATE TABLE IF NOT EXISTS clientes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nombre TEXT,
      email TEXT UNIQUE,
      password TEXT,
      telefono TEXT,
      fecha_registro TEXT
    );
  `);

  // Tabla empleados
  db.run(`
    CREATE TABLE IF NOT EXISTS empleados (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nombre TEXT,
      email TEXT UNIQUE,
      password TEXT,
      especialidad TEXT,
      estado TEXT
    );
  `);

  // Tabla servicios
  db.run(`
    CREATE TABLE IF NOT EXISTS servicios (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nombre TEXT,
      descripcion TEXT,
      duracion INTEGER,
      precio REAL
    );
  `);

  // Tabla horarios
  db.run(`
    CREATE TABLE IF NOT EXISTS horarios (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      empleado_id INTEGER,
      dia_semana TEXT,
      hora_inicio TEXT,
      hora_fin TEXT
    );
  `);

  // Tabla citas
  db.run(`
    CREATE TABLE IF NOT EXISTS citas (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      cliente_id INTEGER,
      empleado_id INTEGER,
      servicio_id INTEGER,
      fecha TEXT,
      hora TEXT,
      estado TEXT
    );
  `);
  
db.run(`
  CREATE TABLE IF NOT EXISTS empleados (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  nombre TEXT NOT NULL,
  especialidad TEXT NOT NULL,
  telefono TEXT,
  activo INTEGER DEFAULT 1
);
`);

  console.log("✔ Tablas creadas correctamente");
};

// Ejecutar creación
createTables();