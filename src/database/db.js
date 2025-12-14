const sqlite3 = require("sqlite3").verbose();
const { open } = require("sqlite");

const openDb = async () => {
  return open({
    filename: "./src/database/barberia.db",
    driver: sqlite3.Database
  });
};

// 👇 ESTA LÍNEA ES LA IMPORTANTE
module.exports = { openDb };