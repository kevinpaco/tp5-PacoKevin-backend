const express = require('express');
const cors = require('cors');
const {mongoose} = require('./database');

var app = express();

app.use(express.json());
app.use(cors({origin: "http://localhost:4200"}));

///se carga le modulo de funcionamiento de rutas
app.use("/api/producto",require('./routes/producto.route'));

//setting 
app.set('port', process.env.PORT || 3000);

//iniciar servidor
app.listen(app.get('port'),()=>{
    console.log("servidor iniciado en puerto: ",app.get('port'))
});