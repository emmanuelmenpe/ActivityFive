const EstadoModel = require('../models/estado');
const MunicipioModel = require('../models/municipio');

exports.crearEstado = async(req, res) => {
    try {
        const estado = new EstadoModel(req.body);
        estado.save();
        res.status(200).json({msg: "Estado registrado exitosamente"});
    } catch (error) {
        console.log(error);
        res.status(500).json({msg: 'Hubo un error el registrar estado registrado'})
    }

}

exports.obtenerEstados = async(req, res) => {
    try {
        //poppulate: para obtener los datos de la relacion
        //donde municipios es el nombre del campo de la coleccion estado
        //y municipios hace referencia a la coleccion Municipio(ver modelo estado)
        //donde solo se quiere el nombre del municipio
        const estado = await EstadoModel.find().populate('municipios',{nombre:1, _id:0});
        res.json({estado}); 
    } catch (error) {
        console.log(error);
        res.status(500).send('hubo un error al obtener los estados');
    }
}

exports.actualizarEstados = async(req, res) => {
    const {nombre} = req.body;
    const estadoEditado = {};

    if (nombre) {
        estadoEditado.nombre= nombre;
    }

    try {
        //obtener el estado por id
        let estado = await EstadoModel.findById(req.params.id);

        //comprobar si existe estado
        if (!estado) {
            return res.status(404).json({msg: 'Estado no encontrado'});
        }

        //guardar cambios
        estado = await EstadoModel.findByIdAndUpdate({_id:req.params.id}, {$set:estadoEditado}, {new:true});

        res.status(200).json({estado});
    } catch (error) {
        console.log(error);
        return res.status(500).json(`error: ${error.message}`);
    }
}

exports.eliminarEstado = async(req, res) => {
    try {
        //obtener el estado por id
        let estado = await EstadoModel.findById(req.params.id);

        //compravar si existe proyecto
        if (!estado) {
            return res.status(404).json({msg: 'Estado no encontrado'});
        }

        //eliminar
        await EstadoModel.findOneAndRemove({_id:req.params.id});
        await MunicipioModel.deleteMany({estado: req.params.id});

        res.status(200).json({msg: 'Estado eliminado'});
    } catch (error) {
        console.log(error);
        return res.status(500).json(`error: ${error.message}`);
    }
}