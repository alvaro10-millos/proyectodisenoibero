const express = require("express");
const router = express.Router();

const { requireAuth } = require("../middlewares/auth.middleware");
const { CitasController } = require("../controllers/citas.controller");

// FORMULARIO NUEVA CITA
router.get(
  "/nueva",
  requireAuth,
  CitasController.nuevaForm
);

// CREAR CITA
router.post(
  "/crear",
  requireAuth,
  CitasController.crear
);

// CONFIRMAR
router.post(
  "/confirmar/:id",
  requireAuth,
  CitasController.confirmar
);

// CANCELAR
router.post(
  "/cancelar/:id",
  requireAuth,
  CitasController.cancelar
);

module.exports = router;