const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');
const { body, validationResult } = require('express-validator');

// Importar variables de entorno
require('dotenv').config();

// Importar test de velocidad
let getSpeedTestResults = require('./services/speedTest');

// Importar controlador del formulario
let sendEmail = require('./services/frmSendMessage');

// Configurar el motor de plantillas EJS
app.set('view engine', 'ejs');
app.set('views', './views'); // Directorio donde estarán las plantillas

// Middleware para manejar los datos del formulario
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Servir archivos estáticos (HTML, CSS, imágenes, etc.) desde la carpeta 'public'
app.use(express.static('public'));

// Redirigir a la página inicial
app.get('/', (req, res) => {
  res.redirect('/inicio');
});

// Ruta de inicio de la aplicacion 
app.get('/inicio', (req, res) => {
  res.render('index', { page: 'inicio' });
});

// Ruta "Sobre nosotros"
app.get('/nosotros', (req, res) => {
  res.render('about', { page: 'nosotros' });
});

// Ruta "Servicios"
app.get('/servicios', (req, res) => {
  res.render('services', { page: 'servicios' });
});

// Ruta "Test"
app.get('/test', (req, res) => {
  res.render('test', { page: 'test' });
});

// Ruta "Contacto"
app.get('/contacto', (req, res) => {
  res.render('contactUs', { page: 'contacto' });
});

// Ruta "Test-velocidad"
app.get('/test-velocidad', async (req, res) => {
  try {
    const speedResults = await getSpeedTestResults();
    res.json(speedResults);
  } catch (error) {
    res.status(500).send('Error realizando el test de velocidad');
  }
});

// Ruta para servir la lista de PDFs
app.get('/documentos', (req, res) => {
  const directoryPath = path.join(__dirname, 'public/documents');
  fs.readdir(directoryPath, (err, files) => {
    if (err) {
      return res.status(500).send('Error al leer la carpeta');
    }
    const pdfFiles = files.filter(file => file.endsWith('.pdf'));
    res.render('documents', { pdfFiles, page: 'documentos' });
  });
});

// Ruta para manejar el formulario de contacto con validación
app.post('/sendMessage', [
  // Validar el nombre
  body('name').isLength({ min: 3 }).withMessage('El nombre debe tener al menos 3 caracteres.'),

  // Validar el correo electrónico
  body('email').isEmail().withMessage('Por favor, ingresa un email válido.'),

  // Validar el asunto
  body('subject').isLength({ min: 5 }).withMessage('El asunto debe tener al menos 5 caracteres.'),

  // Validar el mensaje
  body('message').isLength({ min: 5 }).withMessage('El mensaje debe contener al menos 5 caracteres.'),

], (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  next();
}, sendEmail);

app.listen(process.env.PORT || 3000, () => {
  console.log(`Servidor ejecutándose en http://localhost:${process.env.PORT}`);
});
