const express = require('express');
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');
const app = express();

// Configurar EJS como motor de plantillas
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Servir archivos estáticos desde la carpeta "public"
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));

// Cargar usuarios desde el archivo JSON
const users = JSON.parse(fs.readFileSync('users.json', 'utf8'));

// Ruta para redirigir la raíz al login
app.get('/', (req, res) => {
    res.redirect('/login');
});

// Ruta para la página de inicio de sesión
app.get('/login', (req, res) => {
    res.render('login');
});

// Ruta para manejar el inicio de sesión
app.post('/login', (req, res) => {
    const { email, password } = req.body;
    const user = users.find(user => user.email === email && user.password === password);

    if (user) {
        res.redirect('/main');
    } else {
        // Pasar 'error' a la vista si las credenciales son incorrectas
        res.render('login', { error: 'Credenciales incorrectas' });
    }
});

// Ruta para la página principal
app.get('/main', (req, res) => {
    res.render('main');
});

// Rutas adicionales
app.get('/analisis-casos-rechazados', (req, res) => {
    res.render('analisis-casos-rechazados-por-mambu');
});

app.get('/tareas-diarias', (req, res) => {
    res.render('tareas_diarias');
});

app.get('/abu', (req, res) => {
    res.render('abu');
});

// Configurar el puerto del servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
