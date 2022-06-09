const mongoose = require('mongoose');

const ClienteSchema = mongoose.Schema({
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

module.exports =  mongoose.model('Localidad', LocalidadSchema);