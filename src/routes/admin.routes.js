const express = require("express");
const router = express.Router();

const { requireAuth } = require("../middlewares/auth.middleware");
const { requireAdmin } = require("../middlewares/role.middleware");

const { AdminController } = require("../controllers/admin.controller");
const { EmpleadosController } = require("../controllers/empleados.controller");
const { ServiciosController } = require("../controllers/servicios.controller");

// DASHBOARD ADMIN
router.get(
  "/dashboard",
  requireAuth,
  requireAdmin,
  AdminController.dashboard
);

// LISTAR EMPLEADOS
router.get(
  "/empleados",
  requireAuth,
  requireAdmin,
  EmpleadosController.listar
);

// CREAR EMPLEADO
router.post(
  "/empleados",
  requireAuth,
  requireAdmin,
  EmpleadosController.crear
);

// ELIMINAR EMPLEADO
router.post(
  "/empleados/eliminar/:id",
  requireAuth,
  requireAdmin,
  EmpleadosController.eliminar
);

// SERVICIOS
router.get(
  "/servicios",
  requireAuth,
  requireAdmin,
  ServiciosController.listar
);

router.post(
  "/servicios",
  requireAuth,
  requireAdmin,
  ServiciosController.crear
);

router.post(
  "/servicios/eliminar/:id",
  requireAuth,
  requireAdmin,
  ServiciosController.eliminar
);

module.exports = router;