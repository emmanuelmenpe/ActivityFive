const mongoose = require('mongoose');

const MunicipioSchema = mongoose.Schema({
    nombre:{
        type: String,
        require: true,
        trim: true
    },
    estado:{
        type: String,
        require: true,
        trim: true
    },
    creado:{
        type: Date,
        default: Date.now()
    }
});

module.exports =  mongoose.model('Municipio', MunicipioSchema);