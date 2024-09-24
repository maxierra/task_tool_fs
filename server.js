<<<<<<< HEAD
const express = require('express');
const path = require('path');
const fs = require('fs');
const multer = require('multer');
const archiver = require('archiver');
const bodyParser = require('body-parser');
const users = require('./users');



const app = express();

// Configurar EJS como motor de plantillas
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Servir archivos estáticos desde la carpeta "public"
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));

// Configurar Multer para la subida de archivos
const upload = multer({ dest: 'uploads/' });

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
        res.render('login', { error: 'Credenciales incorrectas' });
    }
});

// Ruta para la página principal
app.get('/main', (req, res) => {
    res.render('main');
});

app.get('/tareas-diarias', (req, res) => {
    res.render('tareas_diarias');
});

app.get('/abu', (req, res) => {
    res.render('abu');
});


// Rutas adicionales
app.get('/analisis-casos-rechazados', (req, res) => {
    res.render('analisis-casos-rechazados-por-mambu');
});

// Ruta de la página de subir archivos
app.get('/archivos_zip', (req, res) => {
    res.render('archivos_zip');  // Renderiza el archivo 'archivos_zip.ejs'
});

// Endpoint para manejar la subida de archivos y la creación del ZIP
app.post('/upload', upload.array('files'), (req, res) => {
    const country = req.body.country; // "CH" o "PE"
    const creationDate = req.body.creationDate; // Fecha en formato "yyyy-mm-dd"
    const files = req.files;
  
    if (!files.length) {
      return res.status(400).send('No se seleccionaron archivos.');
    }
  
    // Nombre del archivo ZIP basado en la fecha seleccionada y el país
    const formattedDate = creationDate.replace(/-/g, ''); // Remover guiones para el nombre del archivo
    const countrySuffix = country === 'PE' ? 'PE' : 'CH';  // 'CH' por defecto
    const zipFileName = `${formattedDate}_G66_${countrySuffix}_MC.zip`;
    const output = fs.createWriteStream(path.join(__dirname, 'public', zipFileName));
    const archive = archiver('zip', { zlib: { level: 9 } });
  
    output.on('close', () => {
      console.log(`Archivo ZIP creado: ${zipFileName}`);
      res.send(zipFileName); // Enviar el nombre del archivo ZIP al cliente
    });
  
    archive.pipe(output);
  
    files.forEach(file => {
      archive.file(file.path, { name: file.originalname });
    });
  
    archive.finalize();
  });
  


// Ruta para borrar archivos temporales
app.delete('/clear-uploads', (req, res) => {
    const uploadsDir = path.join(__dirname, 'uploads');

    fs.readdir(uploadsDir, (err, files) => {
        if (err) {
            return res.status(500).send('Error al leer la carpeta de archivos.');
        }

        if (files.length === 0) {
            return res.send('No hay archivos para borrar.');
        }

        files.forEach(file => {
            fs.unlink(path.join(uploadsDir, file), (err) => {
                if (err) {
                    console.error(`Error al eliminar el archivo ${file}: ${err.message}`);
                }
            });
        });

        res.send('Archivos temporales borrados exitosamente.');
    });
});

// Puerto y servidor
const port = 3000;
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
=======
const express = require('express');
const path = require('path');
const fs = require('fs');
const multer = require('multer');
const archiver = require('archiver');
const bodyParser = require('body-parser');
const users = require('./users');



const app = express();

// Configurar EJS como motor de plantillas
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Servir archivos estáticos desde la carpeta "public"
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));

// Configurar Multer para la subida de archivos
const upload = multer({ dest: 'uploads/' });

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
        res.render('login', { error: 'Credenciales incorrectas' });
    }
});

// Ruta para la página principal
app.get('/main', (req, res) => {
    res.render('main');
});

app.get('/tareas-diarias', (req, res) => {
    res.render('tareas_diarias');
});

app.get('/abu', (req, res) => {
    res.render('abu');
});


// Rutas adicionales
app.get('/analisis-casos-rechazados', (req, res) => {
    res.render('analisis-casos-rechazados-por-mambu');
});

// Ruta de la página de subir archivos
app.get('/archivos_zip', (req, res) => {
    res.render('archivos_zip');  // Renderiza el archivo 'archivos_zip.ejs'
});

// Endpoint para manejar la subida de archivos y la creación del ZIP
app.post('/upload', upload.array('files'), (req, res) => {
    const country = req.body.country; // "CH" o "PE"
    const creationDate = req.body.creationDate; // Fecha en formato "yyyy-mm-dd"
    const files = req.files;
  
    if (!files.length) {
      return res.status(400).send('No se seleccionaron archivos.');
    }
  
    // Nombre del archivo ZIP basado en la fecha seleccionada y el país
    const formattedDate = creationDate.replace(/-/g, ''); // Remover guiones para el nombre del archivo
    const countrySuffix = country === 'PE' ? 'PE' : 'CH';  // 'CH' por defecto
    const zipFileName = `${formattedDate}_G66_${countrySuffix}_MC.zip`;
    const output = fs.createWriteStream(path.join(__dirname, 'public', zipFileName));
    const archive = archiver('zip', { zlib: { level: 9 } });
  
    output.on('close', () => {
      console.log(`Archivo ZIP creado: ${zipFileName}`);
      res.send(zipFileName); // Enviar el nombre del archivo ZIP al cliente
    });
  
    archive.pipe(output);
  
    files.forEach(file => {
      archive.file(file.path, { name: file.originalname });
    });
  
    archive.finalize();
  });
  


// Ruta para borrar archivos temporales
app.delete('/clear-uploads', (req, res) => {
    const uploadsDir = path.join(__dirname, 'uploads');

    fs.readdir(uploadsDir, (err, files) => {
        if (err) {
            return res.status(500).send('Error al leer la carpeta de archivos.');
        }

        if (files.length === 0) {
            return res.send('No hay archivos para borrar.');
        }

        files.forEach(file => {
            fs.unlink(path.join(uploadsDir, file), (err) => {
                if (err) {
                    console.error(`Error al eliminar el archivo ${file}: ${err.message}`);
                }
            });
        });

        res.send('Archivos temporales borrados exitosamente.');
    });
});

// Puerto y servidor
const port = 3000;
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
>>>>>>> cc66deb849b68f9c334e71e10b20deea05e4b09b
