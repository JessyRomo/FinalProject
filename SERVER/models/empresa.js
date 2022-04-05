const mongoose = require("mongoose");
let empresaSchema = new mongoose.Schema({
        strNombre:{
            type:String,
            required: [true, "Es necesario especificar el campo strNombre"]
        },
        strRazonSocial:{
            type:String,
            required: [true, "Es necesario especificar el campo strRazonSocial"]
        },
    });
module.exports = mongoose.model("empresa", empresaSchema);    