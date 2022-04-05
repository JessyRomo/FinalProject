const express = require("express");
const router = express.Router();
const empresaModel = require("../models/empresa");
const ObjectId = require("mongoose").Types.ObjectId;

//CONSULTA GLOBAL
router.get("/", (req, res) => {
   empresaModel.find()
   .then((empresa) => {
       return res.status(200).json({
           ok:true,
           status: 200,
           msg:"Se ha realizado correctamente la busqueda",
           cont:{
               empresa
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

    const idEmpresa = req.params.id;

    if(!ObjectId.isValid(idEmpresa)){
        return res.status(400).json({
            ok:false,
            status: 400,
            msg:"El identificador no es valido"
        })
    }
    empresaModel.findOne({_id:idEmpresa})
    .then((empresa) => {
        return res.status(200).json({
            ok:true,
            status: 200,
            msg:"Se ha realizado correctamente la busqueda",
            cont:{
                empresa
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

    const empresaBody= req.body;
    const empresa= new empresaModel(empresaBody);

    empresa.save()
    .then((documento)=> {
        return res.status(200).json({
            ok: true,
            status: 200,
            msg: "La empresa se registro exitosamente.",
            cont: {
                documento
            }
        })
    })
    .catch((err)=> {
        return res.status(400).json({
            ok: false,
            status: 400,
            msg: "Hubo un error al intentar registrar la empresa",
            cont: {
                err
            }
        })
    })
  
});

router.put("/:id", (req, res) => {

    const empresaBody= req.body;
    const idEmpresa = req.params.id;
    
    empresaModel.findByIdAndUpdate(idEmpresa, empresaBody)
    .then((empresa) => {
        return res.status(200).json({
            ok:true,
            status: 200,
            msg:"Se ha modificado correctamente",
            cont:{
                empresa
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

    const idEmpresa = req.params.id;

    empresaModel.findByIdAndRemove(idEmpresa)
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