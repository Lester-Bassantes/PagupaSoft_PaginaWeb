const express = require('express');
const app = express();
const port = 3000;

// Configurar el motor de plantillas EJS
app.set('view engine', 'ejs');
app.set('views', './views'); // Directorio donde estarán las plantillas

// Servir archivos estáticos (HTML, CSS, imágenes, etc.) desde la carpeta 'public'
app.use(express.static('public'));

// Ruta de inicio de la aplicacion 
app.get('/inicio', (req, res) => {
  res.render('index');
});

// Ruta "Sobre nosotros"
app.get('/about', (req, res) => {
    res.render('about');
});

app.listen(port, () => {
  console.log(`Servidor ejecutándose en http://localhost:${port}`);
});
