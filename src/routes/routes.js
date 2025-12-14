const express = require("express");
const router = express.Router();
const { openDb } = require("../database/db");

const { requireAuth } = require("../middlewares/auth.middleware");

router.get("/", requireAuth, async (req, res) => {
  try {
    const db = await openDb();

    const totalRow = await db.get(
      "SELECT COUNT(*) AS total FROM citas"
    );

    const confirmadasRow = await db.get(
      "SELECT COUNT(*) AS total FROM citas WHERE estado = 'confirmada'"
    );

    const pendientesRow = await db.get(
      "SELECT COUNT(*) AS total FROM citas WHERE estado = 'pendiente'"
    );

    const citas = await db.all(
    "SELECT id, fecha, hora, estado FROM citas ORDER BY fecha, hora"
    );

    res.render("index", {
  title: "Inicio", // 👈 ESTA LÍNEA ES LA CLAVE
  totalCitas: totalRow.total,
  citasConfirmadas: confirmadasRow.total,
  citasPendientes: pendientesRow.total,
  citas
});

  } catch (error) {
    console.error("❌ ERROR EN HOME:", error);
    res.status(500).send("Error en el servidor");
  }
});

module.exports = router;