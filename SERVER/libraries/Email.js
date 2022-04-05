const Nodemailer = require('nodemailer');
const Hogan = require('hogan.js');
const fs = require('fs');
const path = require('path');

class Email {

    constructor(){
        this.transport = Nodemailer.createTransport({
            service: 'gmail',
            auth:{
                user: 'jessicaromo028@gmail.com',
                pass: 'Teamojesus20*'
            }
        })
    }

    enviarCorreo(correoElectronico, information){
        return new Promise((resolve, reject) => {
            const template = fs.readFileSync(path.resolve(__dirname,'../assets/templatesHTML/bienvenida.html'), 'utf-8');

            const templateCompiled = Hogan.compile(template);
            const renderinformation = templateCompiled.render(information);

            this.transport.sendMail({
                from: '"JGRM" <jessicaromo028@gmail.com>',
                to: correoElectronico,
                subject: "CORREO ELECTRONICO DE BIENVENIDA",
                html: renderinformation
            }).then((response) => {
                resolve(response);
                
            }).catch((error) => {
                reject(error);
            })
        })
    }
}

module.exports = new Email();