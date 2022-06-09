const LocalidadModel = require('../models/localidad');
const MunicipioModel = require('../models/municipio');

exports.crearLocalidad = async(req, res) => {
    try {
        const localidad = new LocalidadModel(req.body);
        await MunicipioModel.findByIdAndUpdate({_id:localidad.municipio.toString()}, {$push: {localidades: localidad._id}});
        localidad.save();
        res.status(200).json({msg: "Localidad registrada exitosamente"});
    } catch (error) {
        console.log(error);
        res.status(500).json({msg: 'Hubo un error el registrar localidad'})
    }

}

exports.obtenerLocalidades = async(req, res) => {
    try {
        //poppulate: para obtener los datos de la relacion
        //donde municipios es el nombre del campo de la coleccion estado
        //y municipios hace referencia a la coleccion Municipio(ver modelo estado)
        //donde solo se quiere el nombre del municipio
        const localidades = await LocalidadModel.find().populate('municipio',{nombre:1, _id:0}).populate('habitantes',{nombre:1, _id:0});
        //localidades.estado = await EstadoModel.findById({_id:localidades.municipio.estado});
        res.json({localidades}); 
    } catch (error) {
        console.log(error);
        res.status(500).send('hubo un error al obtener las localidades');
    }
}

exports.actualizarLocalidad = async(req, res) => {
    const {nombre, municipio} = req.body;
    const localidadEditada = {};

    if (req.body) {
        localidadEditada.nombre= nombre;
        localidadEditada.municipio= municipio;
    }

    try {
        //obtener la localidad por id
        let localidad = await LocalidadModel.findById(req.params.id);

        //comprobar si existe localidad
        if (!localidad) {
            return res.status(404).json({msg: 'Localidad no encontrada'});
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

        //compravar si existe localidad
        if (!localidad) {
            return res.status(404).json({msg: 'Localidad no encontrada'});
        }

        //eliminar
        await LocalidadModel.findOneAndRemove({_id:req.params.id});

        res.status(200).json({msg: 'Localidad eliminada'});
    } catch (error) {
        console.log(error);
        return res.status(500).json(`error: ${error.message}`);
    }
}