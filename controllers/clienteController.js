const ClienteModel = require('../models/cliente');
const LocalidadModel = require('../models/localidad');

exports.crearCliente = async(req, res) => {
    try {
        const cliente = new ClienteModel(req.body);
        await LocalidadModel.findByIdAndUpdate({_id:cliente.localidad.toString()}, {$push: {habitantes: cliente._id}});
        cliente.save();
        res.status(200).json({msg: "Cliente registrado exitosamente"});
    } catch (error) {
        console.log(error);
        res.status(500).json({msg: 'Hubo un error el registrar cliente'})
    }

}

exports.obtenerClientes = async(req, res) => {
    try {
        const clientes = await ClienteModel.find().populate('localidad',{nombre:1, _id:0});
        //const clientes = await ClienteModel.find().populate('localidad',{nombre:1, _id:0});
        //clientes.direccion.localidad = await LocalidadModel.findById({_id:clientes.direccion.localidad});
        res.json({clientes}); 
    } catch (error) {
        console.log(error);
        res.status(500).send('hubo un error al obtener los clientes');
    }
}

exports.actualizarCliente = async(req, res) => {
    const {nombre, apellidos, rfc, direccion, email, telefono, estatus} = req.body;
    const clienteEditado = {};

    if (req.body) {
        clienteEditado.nombre= nombre;
        clienteEditado.apellidos= apellidos;
        clienteEditado.rfc= rfc;
        clienteEditado.direccion= direccion;
        clienteEditado.email= email;
        clienteEditado.telefono= telefono;
        clienteEditado.estatus= estatus;
    }

    try {
        //obtener el cliente por id
        let cliente = await ClienteModel.findById(req.params.id);

        //comprobar si existe cliente
        if (!cliente) {
            return res.status(404).json({msg: 'Cliente no encontrado'});
        }

        //guardar cambios
        cliente = await ClienteModel.findByIdAndUpdate({_id:req.params.id}, {$set:clienteEditado}, {new:true});

        res.status(200).json({cliente});
    } catch (error) {
        console.log(error);
        return res.status(500).json(`error: ${error.message}`);
    }
}

exports.eliminarCliente = async(req, res) => {
    try {
        //obtener el cliente por id
        let cliente = await ClienteModel.findById(req.params.id);

        //comprabar si existe cliente
        if (!cliente) {
            return res.status(404).json({msg: 'Cliente no encontrado'});
        }

        //eliminar
        await ClienteModel.findOneAndRemove({_id:req.params.id});

        res.status(200).json({msg: 'Cliente eliminado'});
    } catch (error) {
        console.log(error);
        return res.status(500).json(`error: ${error.message}`);
    }
}