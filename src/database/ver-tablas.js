const { openDb } = require("./db.js");

(async () => {
  const db = await openDb();

  const tables = await db.all(`
    SELECT name 
    FROM sqlite_master 
    WHERE type = 'table'
  `);

  console.log("📌 Tablas encontradas:");
  console.table(tables);
})();