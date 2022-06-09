const mongoose = require('mongoose');

const ClienteSchema = mongoose.Schema({
    nombre:{
        type: String,
        require: true,
        trim: true
    },
    apellidos:{
        type: String,
        require: true,
        trim: true
    },
    rfc:{
        type: String,
        require: true,
        trim: true
    }, 
    localidad:{
        type: mongoose.Schema.Types.ObjectId, 
        ref:'Localidad', 
        require: true,
        trim: true
    },
    direccion:{
        calle:{type: String, require: true, trim: true},
        numeroExterior:{type: String, require: true, trim: true},
        numeroInterior:{type: String, trim: true},
        cp:{type: String, require: true, trim: true},
    },
    email:{
        type: String,
        require: true,
        trim: true
    },
    telefono:{
        type: String,
        require: true,
        trim: true
    },
    estatus:{
        type: String,
        trim: true,
        default:"activo"
    },
    creado:{
        type: Date,
        default: Date.now()
    }
});

module.exports =  mongoose.model('Cliente', ClienteSchema);