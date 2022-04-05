const mongoose = require("mongoose");
let puestoSchema = new mongoose.Schema({
    strNombre:{
        type:String,
        required: [true, "Es necesario especificar el campo strNombre"]
    },
    idEmpresa:{
        type: mongoose.Schema.Types.ObjectId,
        required:[true, "Es necesario el id de la empresa"]
    }

});
module.exports = mongoose.model("puesto", puestoSchema);    