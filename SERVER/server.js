const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("./config/config.js");
require("colors");

app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb', extended:true}));
app.use("/api",require('./routes/index.js'));

app.get("/", (req, res) => {
    res.status(200).json({
        message: "This App is Working"
    })
})

mongoose.connect(process.env.DB_URL, () => {
    console.log("Se conecto a la base de datos")
});

app.listen(process.env.PORT, () => {
    console.log(`Escuchando en  el puerto ${process.env.PORT.green}`); //Template
});