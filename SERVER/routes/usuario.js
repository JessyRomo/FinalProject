const express = require("express");
const { route } = require("express/lib/application");
const router = express.Router();
const UsuarioModel = require("../models/usuario");
const ObjectId = require("mongoose").Types.ObjectId;

//CONSULTA GLOBAL
router.get("/", (req, res) => {
   UsuarioModel.find()
   .then((usuarios) => {
       return res.status(200).json({
           ok:true,
           status: 200,
           msg:"Se ha realizado correctamente la busqueda",
           cont:{
               usuarios
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

    const idUsuario = req.params.id;

    if(!ObjectId.isValid(idUsuario)){
        return res.status(400).json({
            ok:false,
            status: 400,
            msg:"El identificador no es valido"
        })
    }
    UsuarioModel.findOne({_id:idUsuario})
    .then((usuario) => {
        return res.status(200).json({
            ok:true,
            status: 200,
            msg:"Se ha realizado correctamente la busqueda",
            cont:{
                usuario
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

    const usuarioBody= req.body;
    const usuarios= new UsuarioModel(usuarioBody);

    usuarios.save()
    .then((documento)=> {
        return res.status(200).json({
            ok: true,
            status: 200,
            msg: "La persona se registro exitosamente.",
            cont: {
                documento
            }
        })
    })
    .catch((err)=> {
        return res.status(400).json({
            ok: false,
            status: 400,
            msg: "Hubo un error al intentar registrar al usuario",
            cont: {
                err
            }
        })
    })
  
});

router.put("/:id", (req, res) => {

    const usuarioBody= req.body;
    const idUsuario = req.params.id;
    
    UsuarioModel.findByIdAndUpdate(idUsuario, usuarioBody)
    .then((usuarios) => {
        return res.status(200).json({
            ok:true,
            status: 200,
            msg:"Se ha modificado correctamente",
            cont:{
                usuarios
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

    const idUsuario = req.params.id;

    UsuarioModel.findByIdAndRemove(idUsuario)
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