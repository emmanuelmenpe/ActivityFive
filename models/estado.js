const mongoose = require('mongoose');

const EstadoSchema = mongoose.Schema({
    nombre:{
        type: String,
        require: true,
        trim: true
    },
    creado:{
        type: Date,
        default: Date.now()
    }
});

module.exports =  mongoose.model('Estado', EstadoSchema);