const express = require("express");
const router = express.Router();
const PuestoModel = require("../models/puesto");
const ObjectId = require("mongoose").Types.ObjectId;

//CONSULTA GLOBAL
router.get("/", (req, res) => {
   PuestoModel.find()
   .then((puesto) => {
       return res.status(200).json({
           ok:true,
           status: 200,
           msg:"Se ha realizado correctamente la busqueda",
           cont:{
               puesto
           }

       })
   })
   .catch((err) => {
       return res.status(400).json({
        ok: false,
        status:(400),
        msg:"Hubo un error en la busqueda",
        cont:{
            err
        }
       })
   })
});

//CONSULTA ESPECIFICA
router.get("/:id", (req, res) => {

    const idPuesto = req.params.id;

    if(!ObjectId.isValid(idPuesto)){
        return res.status(400).json({
            ok:false,
            status: 400,
            msg:"El identificador no es valido"
        })
    }
    PuestoModel.findOne({_id:idPuesto})
    .then((puesto) => {
        return res.status(200).json({
            ok:true,
            status: 200,
            msg:"Se ha realizado correctamente la busqueda",
            cont:{
                puesto
            }
 
        })
    })
    .catch((err) => {
        return res.status(400).json({
         ok: false,
         status:(400),
         msg:"Hubo un error en la busqueda",
         cont:{
             err
         }
        })
    })

   
});

router.post("/", (req, res) => {

    const puestoBody= req.body;
    const puesto= new PuestoModel(puestoBody);

    puesto.save()
    .then((documento)=> {
        return res.status(200).json({
            ok: true,
            status: 200,
            msg: "El puesto se registro exitosamente.",
            cont: {
                documento
            }
        })
    })
    .catch((err)=> {
        return res.status(400).json({
            ok: false,
            status: 400,
            msg: "Hubo un error al intentar registrar el puesto",
            cont: {
                err
            }
        })
    })
  
});

router.put("/:id", (req, res) => {

    const puestoBody= req.body;
    const idPuesto = req.params.id;
    
    PuestoModel.findByIdAndUpdate(idPuesto, puestoBody)
    .then((puesto) => {
        return res.status(200).json({
            ok:true,
            status: 200,
            msg:"Se ha modificado correctamente",
            cont:{
                puesto
            }        
    })
        })
    .catch((err) => {
        return res.status(400).json({
         ok: false,
         status:(400),
         msg:"Hubo un error al momento de modificar",
         cont:{
             err
         }
        })
    })
});

router.delete("/:id", (req, res) => {

    const idPuesto = req.params.id;

    PuestoModel.findByIdAndRemove(idPuesto)
    .then(() => {
        return res.status(200).json({
            ok:true,
            status: 200,
            msg:"Se ha eliminado correctamente",
 
        })
    })
    .catch((err) => {
        return res.status(400).json({
         ok: false,
         status:(400),
         msg:"Hubo un error al momento de eliminar",
         cont:{
             err
         }
        })
    })    
});

module.exports = router;