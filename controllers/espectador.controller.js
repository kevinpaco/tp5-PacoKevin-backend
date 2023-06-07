const Espectador = require('../models/Espectador');

const espectadorController ={};

espectadorController.getEspectadores = async (req,res)=>{
     
    var espectador = await Espectador.find();
    res.json(espectador); 
}

espectadorController.saveEspectador = async (req,res)=>{

    try{
         var espectador = new Espectador(req.body);
         await espectador.save();
         res.json({
            "status":"1",
            "msg":"El espectador se guardo"
         })
    }catch(error){
         res.status(400).json({
            "status":"0",
            "msg":"El espectador no se guardo"
         })
    }
}

espectadorController.getEspectador = async (req,res)=>{
     
     var espectador = await Espectador.findById(req.params.id);
     res.json(espectador);
}

module.exports = espectadorController;