const mongoose = require('mongoose');

const MunicipioSchema = mongoose.Schema({
    nombre:{
        type: String,
        require: true,
        trim: true
    },
    localidades:[{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Localidad'
    }],
    estado:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Estado',
        require: true,
    },
    creado:{
        type: Date,
        default: Date.now()
    }
});

module.exports =  mongoose.model('Municipio', MunicipioSchema);