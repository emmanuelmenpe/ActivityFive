const express = require('express');
const municipioController = require('../controllers/municipioController');


const router = express.Router();

//crear
router.post('/api/municipios', 
municipioController.crearMunicipio
);

//obtener municipio
router.get('/api/municipios', 
municipioController.obtenerMunicipios
);

router.put('/api/municipios/:id', 
municipioController.actualizarMunicipios
);

router.delete('/api/municipios/:id', 
municipioController.eliminarMunicipio
);

module.exports = router;
