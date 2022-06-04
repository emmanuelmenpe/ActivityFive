const mongoose = require('mongoose');
require('dotenv').config({path: '.env'});

const URI = process.env.MONGOOSE_URI
    ? process.env.MONGOOSE_URI
    : 'mongodb://localhost/activityFive';

const conectarDB = async() => {
    try {
        await mongoose.connect(URI,{
            useNewUrlParser: true,
            useUnifiedTopology:true,
            /*
            no soportados desde version 6:
            useFindAndModify: false,
            useCreateIndex: true,
            */
        })
        console.log(`coneccion a BD ${process.env.NOMBREDB} establecida`);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

module.exports = conectarDB;
