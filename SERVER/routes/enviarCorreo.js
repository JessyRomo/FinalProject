const express = require("express");
const router = express.Router();
const Email = require('../libraries/Email')

router.post("/", (req, res) =>{
    const {correo} = req.body;
    Email.enviarCorreo(correo, req.body)
    .then((responseCorreo) => {
        res.status(200).json({
            ok: true,
            status:200,
            msg:'Se envio el correo exitosamente',
            cont :{
                responseCorreo
            }
        })
    }).catch((err) => {
        res.status(500).json({
            ok:false,
            status:500,
            msg:'Hubo un erro al enviar el correo',
            cont:{
                err: err.message
            }
        })
    })
})
module.exports = router;