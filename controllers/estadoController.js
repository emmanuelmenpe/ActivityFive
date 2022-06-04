const EstadoModel = require('../models/estado');

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