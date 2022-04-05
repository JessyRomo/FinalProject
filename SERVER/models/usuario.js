const mongoose = require("mongoose");

let usuarioSchema = new mongoose.Schema({
    strNombre:{
        type:String,
        required: [true, "Es necesario especificar el campo strNombre"]
    },
    strPrimerApellido:{
        type:String,
        required: [true, "Es necesario especificar el campo strPrimerApellido"]
    },
    strSegundoApellido:{
        type:String,
        required: [true, "Es necesario especificar el campo strSegundoApellido"]
    },
    nmbEdad:{
        type:Number,
        required: [true, "Es necesario especificar el campo nmbEdad"]
    },
    idPuesto:{
        type: mongoose.Schema.Types.ObjectId,
        required:[true, "Es necesario el id del puesto"]
    },
    credenciales: {
        strCorreo:{
            type:String,
            required: [true, "Es necesario especificar el campo strCorreo"]
        },
        stsPassword: {
            type:String,
            required: [true, "Es necesario especificar el campo stsPassword"]
        },
    },
});

module.exports = mongoose.model("usuario", usuarioSchema);


   
    