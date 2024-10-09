const express = require('express');
const app = express();
const port = 3000;

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
  res.render('404', { page: 'servicios' });
});

// Ruta "Blog"
app.get('/blog', (req, res) => {
  res.render('404', { page: 'blog' });
});

// Ruta "Contacto"
app.get('/contacto', (req, res) => {
  res.render('404', { page: 'contacto' });
});

app.listen(port, () => {
  console.log(`Servidor ejecutándose en http://localhost:${port}`);
});
