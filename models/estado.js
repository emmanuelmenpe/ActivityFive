const mongoose = require('mongoose');

const EstadoSchema = mongoose.Schema({
    nombre:{
        type: String,
        require: true,
        trim: true
    },
    municipios:[{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Municipio'
    }],
    creado:{
        type: Date,
        default: Date.now()
    }
});

module.exports =  mongoose.model('Estado', EstadoSchema);