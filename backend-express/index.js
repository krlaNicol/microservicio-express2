const express = require('express');
const { Pool } = require('pg');
const router = express.Router();

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'base_de_datos',
    password: '1996',
    port: 5433,
});

// Ruta para obtener los datos de la tabla usuarios
router.get('/data', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM usuarios');
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error al obtener los datos');
    }
});

// Ruta para agregar un nuevo usuario
router.post('/data', async (req, res) => {
    const { nombre, correo, edad } = req.body; // Asegúrate de que estos campos existen
    try {
        const result = await pool.query('INSERT INTO usuarios (nombre, correo, edad) VALUES ($1, $2, $3) RETURNING *', [nombre, correo, edad]);
        res.status(201).json(result.rows[0]); // Responder con el usuario creado
    } catch (err) {
        console.error(err);
        res.status(500).send('Error al agregar el usuario');
    }
});

module.exports = router;  // Exportar el router
