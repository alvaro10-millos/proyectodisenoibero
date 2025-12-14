const { ClienteModel } = require("../models/cliente.model.js");
const bcrypt = require("bcryptjs");

class ClienteController {

  // Mostrar formulario de registro
  static registroForm(req, res) {
    res.render("auth/registroCliente", {
      title: "Registro de Cliente"
    });
  }

  // Procesar registro
  static async registrar(req, res) {
    const { nombre, email, password, telefono } = req.body;

    const existe = await ClienteModel.buscarPorEmail(email);

    if (existe) {
      return res.render("auth/registroCliente", {
        title: "Registro de Cliente",
        error: "Este correo ya está registrado"
      });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    await ClienteModel.crearCliente({
      nombre,
      email,
      telefono,
      password: passwordHash
    });

    // 👉 luego del registro va al login
    res.redirect("/cliente/login");
  }

  // Mostrar formulario de login
  static loginForm(req, res) {
    res.render("auth/login", {
      title: "Iniciar sesión"
    });
  }

  // Procesar login
  static async login(req, res) {
    const { email, password } = req.body;

    const cliente = await ClienteModel.buscarPorEmail(email);

    if (!cliente) {
      return res.render("auth/login", {
        title: "Iniciar sesión",
        error: "Usuario no encontrado"
      });
    }

    const coincide = await bcrypt.compare(password, cliente.password);

    if (!coincide) {
      return res.render("auth/login", {
        title: "Iniciar sesión",
        error: "Contraseña incorrecta"
      });
    }

   
  // ✅ GUARDAR SESIÓN (USANDO EL ROL REAL)
  req.session.user = {
    id: cliente.id,
    nombre: cliente.nombre,
    email: cliente.email,
    rol: cliente.rol   // 👈 ESTA ES LA CLAVE
  };
    // ✅ REDIRECCIÓN CORRECTA
    res.redirect("/");
  }
}

module.exports = { ClienteController };