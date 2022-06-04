const express = require('express');
const estadoController = require('../controllers/estadoController');


const router = express.Router();

//crear
router.post('/api/estados', 
estadoController.crearEstado
);

module.exports = router;