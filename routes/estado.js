const express = require('express');
const estadoController = require('../controllers/estadoController');


const router = express.Router();

//crear
router.post('/api/estados', 
estadoController.crearEstado
);

//obtener estados
router.get('/api/estados', 
estadoController.obtenerEstados
);

router.put('/api/estados/:id', 
estadoController.actualizarEstados
);

router.delete('/api/estados/:id', 
estadoController.eliminarEstado
);

module.exports = router;