const MunicipioModel = require('../models/municipio');
const EstadoModel = require('../models/estado');
const localidadModel = require('../models/localidad');

exports.crearMunicipio = async(req, res) => {
    try {
        const municipio = new MunicipioModel(req.body);
        //buscar estado por id y agregarle al campo municipios el id del municipio
        await EstadoModel.findByIdAndUpdate({_id:municipio.estado.toString()}, {$push:{municipios:municipio._id}}, {new:true});
        municipio.save();
        res.status(200).json({msg: "Municipio registrado exitosamente"});
    } catch (error) {
        console.log(error);
        res.status(500).json({msg: 'Hubo un error el registrar  Municipio'})
    }

}

exports.obtenerMunicipios = async(req, res) => {
    try {
        //poppulate: para obtener los datos de la relacion
        //donde estado es el nombre del campo de la coleccion municipio
        //y estado hace referencia a la coleccion estados(ver modelo municipio)
        //dode solo se quiere el nombre del estado
        const municipios = await MunicipioModel.find().populate('estado', {nombre:1, _id:0}).populate('localidades', {nombre:1, _id:0});
        res.json({municipios}); 
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error al obtener los Municipios');
    }
}

exports.actualizarMunicipios = async(req, res) => {
    const {nombre, estado} = req.body;
    //console.log(req.body);
    const municipioEditado = {};

    if (req.body) {
        municipioEditado.nombre= nombre;
        municipioEditado.estado= estado;
    }

    try {
        //obtener el municipio por id
        let municipio = await MunicipioModel.findById(req.params.id);

        //comprobar si existe el municipio
        if (!municipio) {
            return res.status(404).json({msg: 'Municipio no encontrado'});
        }

        //guardar cambios
        municipio = await MunicipioModel.findByIdAndUpdate({_id:req.params.id}, {$set:municipioEditado}, {new:true});

        res.status(200).json({municipio});
    } catch (error) {
        console.log(error);
        return res.status(500).json(`error: ${error.message}`);
    }
}

exports.eliminarMunicipio = async(req, res) => {
    try {
        //obtener el municipio por id
        let municipio = await MunicipioModel.findById(req.params.id);

        //comprabar si existe municipio
        if (!municipio) {
            return res.status(404).json({msg: 'Municipio no encontrado'});
        }

        //eliminar
        await MunicipioModel.findOneAndRemove({_id:req.params.id});
        await localidadModel.deleteMany({municipio:req.params.id});

        res.status(200).json({msg: 'Municipio eliminado'});
    } catch (error) {
        console.log(error);
        return res.status(500).json(`error: ${error.message}`);
    }
}