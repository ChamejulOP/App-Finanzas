const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const app = express();
const port = 3000; // Puedes cambiar el puerto según tus necesidades

app.use(express.static(__dirname));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const conexion = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'finanzas_db'
});

conexion.connect((error) => {
    if (error) {
        console.error('Error al conectar: ' + error.stack);
        return;
    }
    console.log('Conexión establecida con éxito.');
});

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/Index.html'); // Ruta para la página principal
});

app.get('/registro', (req, res) => {
    res.sendFile(__dirname + '/registro.html'); // Ruta para la página de registro
});

app.post('/registrar-usuario', (req, res) => {
    const userData = req.body;

    // Valida los datos del formulario, por ejemplo, verifica que los campos no estén vacíos.

    if (!userData.DNI || !userData.Nombre || !userData.FechaDeNacimiento || !userData.Correo || !userData.Contraseña) {
        return res.status(400).json({ success: false, message: 'Todos los campos son obligatorios' });
    }

    // Realiza la inserción en la base de datos
    const sql = 'INSERT INTO usuario (DNI, Nombre, FechaDeNacimiento, Correo, Contraseña) VALUES (?, ?, ?, ?, ?)';
    const values = [userData.DNI, userData.Nombre, userData.FechaDeNacimiento, userData.Correo, userData.Contraseña];

    conexion.query(sql, values, (error, result) => {
        if (error) {
            console.error('Error al registrar el usuario: ' + error);
            return res.status(500).json({ success: false, message: 'Error al registrar el usuario' });
        } else {
            console.log('Usuario registrado con éxito');
            return res.status(200).json({ success: true, message: 'Usuario registrado con éxito' });
        }
    });
});


app.listen(port, () => {
    console.log(`Servidor escuchando en el puerto ${port}`);
});
