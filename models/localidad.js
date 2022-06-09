const mongoose = require('mongoose');

const LocalidadSchema = mongoose.Schema({
    nombre:{
        type: String,
        require: true,
        trim: true
    },
    municipio:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Municipio',
        require: true,
    },
    habitantes:[{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Cliente'
    }],
    creado:{
        type: Date,
        default: Date.now()
    }
});

module.exports =  mongoose.model('Localidad', LocalidadSchema);