const MunicipioModel = require('../models/municipio');

exports.crearMunicipio = async(req, res) => {
    try {
        const municipio = new MunicipioModel(req.body);
        municipio.save();
        res.status(200).json({msg: "Municipio registrado exitosamente"});
    } catch (error) {
        console.log(error);
        res.status(500).json({msg: 'Hubo un error el registrar  Municipio'})
    }

}

exports.obtenerMunicipios = async(req, res) => {
    try {
        const municipios = await MunicipioModel.find();
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

        res.status(200).json({msg: 'Municipio eliminado'});
    } catch (error) {
        console.log(error);
        return res.status(500).json(`error: ${error.message}`);
    }
}