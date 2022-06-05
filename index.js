//importaciones
const conectarDB = require('./config/db');
const express = require('express');
const cors = require('cors');
const clienteRoute = require('./routes/cliente');

//crear instancia de express
const app = express();

conectarDB();

// Analiza las solicitudes JSON entrantes y coloca los datos analizados en req.body.
app.use(express.json({extended: true}));

//permite acceder a la API desde cualquier origen(puestos distintos)
app.use(cors());

//agregar rutas al servidor
app.use(clienteRoute);

//crear puesto de escucha
const PORT = process.env.PORT || 4000;

//habilitar puerto de escucha
app.listen(PORT, () => {
    console.log(`servidor ejecutandose en puerto ${PORT}`);
});