const express = require('express');
const app = express();
const port = 3000;
const fs = require('fs');
const path = require('path');

// Importar test de velocidad
let getSpeedTestResults = require('./services/speedTest');

// Configurar el motor de plantillas EJS
app.set('view engine', 'ejs');
app.set('views', './views'); // Directorio donde estarán las plantillas

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
  res.render('404', { page: 'contacto' });
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

app.listen(port, () => {
  console.log(`Servidor ejecutándose en http://localhost:${port}`);
});
