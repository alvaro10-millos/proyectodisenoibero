const express = require("express");
const path = require("path");
const expressLayouts = require("express-ejs-layouts");
const session = require("express-session");

const indexRouter = require("./routes/routes.js");
const clienteRoutes = require("./routes/cliente.routes.js");
const citasRoutes = require("./routes/citas.routes.js");
const adminRoutes = require("./routes/admin.routes");

const app = express();
const PORT = process.env.PORT || 3000;

// =======================
// CONFIGURACIÓN
// =======================
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "../public")));

app.use(expressLayouts);
app.set("layout", "layout/main");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    secret: "clave_secreta_barberia",
    resave: false,
    saveUninitialized: false,
  })
);

// =======================
// VARIABLES GLOBALES
// =======================
app.use((req, res, next) => {
  res.locals.appName = "Plataforma Agenda de Citas";
  res.locals.currentYear = new Date().getFullYear();
  res.locals.currentPath = req.path;
  res.locals.usuario = req.session.user || null;
  next();
});

// =======================
// RUTAS (⚠️ AQUÍ ES CLAVE)
// =======================
app.use("/", indexRouter);
app.use("/cliente", clienteRoutes);
app.use("/citas", citasRoutes);
app.use("/admin", adminRoutes);

// =======================
// ERRORES
// =======================
app.use((req, res) => {
  res.status(404).render("404", {
    title: "Página No Encontrada",
    message: "Lo sentimos, la página que buscas no existe.",
  });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).render("500", {
    title: "Error Interno del Servidor",
    message: "Ha ocurrido un error en el servidor.",
  });
});

// =======================
// SERVIDOR (SIEMPRE AL FINAL)
// =======================
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});







