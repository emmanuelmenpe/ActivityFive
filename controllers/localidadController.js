const ClienteModel = require('../models/localidad');

exports.crearLocalidad = async(req, res) => {
    try {
        const localidad = new LocalidadModel(req.body);
        localidad.save();
        res.status(200).json({msg: "localidad registrada exitosamente"});
    } catch (error) {
        console.log(error);
        res.status(500).json({msg: 'Hubo un error el registrar la localidad'})
    }

}

exports.obtenerLocalidades = async(req, res) => {
    try {
        const localidades = await LocalidadModel.find();
        res.json({localidades}); 
    } catch (error) {
        console.log(error);
        res.status(500).send('hubo un error al obtener las localidades');
    }
}

exports.actualizarLocalidad = async(req, res) => {
    const {nombre} = req.body;
    const localidadEditada = {};

    if (req.body) {
        localidadEditada.nombre= nombre;
    }

    try {
        //obtener la localidad por id
        let localidad = await LocalidadModel.findById(req.params.id);

        //comprobar si existe la localidad
        if (!localidad) {
            return res.status(404).json({msg: 'localidad no registrada'});
        }

        //guardar cambios
        localidad = await LocalidadModel.findByIdAndUpdate({_id:req.params.id}, {$set:localidadEditada}, {new:true});

        res.status(200).json({localidad});
    } catch (error) {
        console.log(error);
        return res.status(500).json(`error: ${error.message}`);
    }
}

exports.eliminarLocalidad = async(req, res) => {
    try {
        //obtener la localidad por id
        let localidad = await LocalidadModel.findById(req.params.id);

        //comprabar si existe localidad
        if (!localidad) {
            return res.status(404).json({msg: 'localidad no encontrada'});
        }

        //eliminar
        await LocalidadModel.findOneAndRemove({_id:req.params.id});

        res.status(200).json({msg: 'Localidad Eliminada'});
    } catch (error) {
        console.log(error);
        return res.status(500).json(`error: ${error.message}`);
    }
}