const express = require('express');
const clienteController = require('../controllers/clienteController');


const router = express.Router();

//crear cliente
router.post('/api/clientes', 
clienteController.crearCliente
);

//obtener clientes
router.get('/api/clientes', 
clienteController.obtenerClientes
);

//editar cliente
router.put('/api/clientes/:id', 
clienteController.actualizarCliente
);

//eliminar cliente
router.delete('/api/clientes/:id', 
clienteController.eliminarCliente
);

module.exports = router;