const express = require('express');
const estadoController = require('../controllers/localidadController');


const router = express.Router();

//crear
router.post('/api/localidades', 
localidadController.crearLocalidades
);

//obtener localidad
router.get('/api/localidades', 
localidadController.obtenerLocalidades
);

router.put('/api/localidades/:id', 
localidadController.actualizarLocalidades
);

router.delete('/api/localidad/:id', 
localidadController.eliminarLocalidad
);

module.exports = router;