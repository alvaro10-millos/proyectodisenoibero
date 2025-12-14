const express = require("express");
const router = express.Router();
const { requireAuth } = require("../middlewares/auth.middleware");
const { ClienteController } = require("../controllers/cliente.controller.js");
const { ClienteModel } = require("../models/cliente.model.js"); // ✅ FALTABA

// Registro
router.get("/registro", ClienteController.registroForm);
router.post("/registro", ClienteController.registrar);

// Login
router.get("/login", ClienteController.loginForm);
router.post("/login", ClienteController.login);

// Logout
router.get("/logout", (req, res) => {
  req.session.destroy(err => {
    if (err) {
      console.error(err);
      return res.redirect("/");
    }
    res.redirect("/cliente/login");
  });
});

// PERFIL
router.get("/perfil", requireAuth, (req, res) => {
  res.render("cliente/perfil", {
    title: "Mi perfil",
    usuario: req.session.user
  });
});

// ACTUALIZAR PERFIL
router.post("/perfil", requireAuth, async (req, res) => {
  const { nombre, email, telefono } = req.body;
  const userId = req.session.user.id;

  await ClienteModel.actualizarPerfil(userId, {
    nombre,
    email,
    telefono
  });

  // actualizar sesión
  req.session.user.nombre = nombre;
  req.session.user.email = email;
  req.session.user.telefono = telefono;

  res.redirect("/cliente/perfil");
});

module.exports = router;