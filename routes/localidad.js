const express = require('express');
const localidadController = require('../controllers/localidadController');


const router = express.Router();

//crear
router.post('/api/localidades', 
localidadController.crearLocalidad
);

//obtener localidades
router.get('/api/localidades', 
localidadController.obtenerLocalidades
);

router.put('/api/localidades/:id', 
localidadController.actualizarLocalidad
);

router.delete('/api/localidades/:id', 
localidadController.eliminarLocalidad
);

module.exports = router;