const express = require('express');
const app = express();
const port = 3000;

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

// Ruta "Blog"
app.get('/test', (req, res) => {
  res.render('test', { page: 'test' });
});

// Ruta "Contacto"
app.get('/contacto', (req, res) => {
  res.render('404', { page: 'contacto' });
});

// Ruta "Test"
app.get('/test-velocidad', async (req, res) => {
  try {
    const speedResults = await getSpeedTestResults();
    res.json(speedResults);
  } catch (error) {
    res.status(500).send('Error realizando el test de velocidad');
  }
});

app.listen(port, () => {
  console.log(`Servidor ejecutándose en http://localhost:${port}`);
});
