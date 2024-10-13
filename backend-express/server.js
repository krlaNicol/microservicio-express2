/* const express = require('express');
const userRoutes = require('./index'); 

const app = express();
const port = 3000;

// Middleware para parsear JSON solo si es necesario
app.use(express.json());

// Usar las rutas definidas en index.js
app.use('/api', userRoutes);  // Montar el enrutador en /api

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});

 */

const express = require('express');
const cors = require('cors'); // Importar el paquete cors
const { Pool } = require('pg');

const app = express();
const port = 3000;

// Configurar la conexión con PostgreSQL
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'base_de_datos',
    password: '1996',
    port: 5433,
});

// Middleware para habilitar CORS
app.use(cors());

// Middleware para parsear el cuerpo de las solicitudes
app.use(express.json());

// Ruta para obtener los datos de la tabla usuarios
app.get('/api/data', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM usuarios');
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error al obtener los datos');
    }
});

// Ruta para agregar un nuevo usuario
app.post('/api/data', async (req, res) => {
    const { nombre, correo, edad } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO usuarios (nombre, correo, edad) VALUES ($1, $2, $3) RETURNING *',
            [nombre, correo, edad]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error al agregar el usuario');
    }
});

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
