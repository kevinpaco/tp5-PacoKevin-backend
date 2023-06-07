const Transaccion = require('../models/Transaccion');
const transaccionController = {}

transaccionController.getTransacciones = async(req,res)=>{
     var email = null;
     var origen=null;
     var destino=null
     if(req.query.email != null){
        email = req.query.email;
        var transacciones =  await Transaccion.find({emailCliente: email});
     }else if(req.query.origen != null && req.query.destino != null) {
          origen=req.query.origen;
          destino=req.query.destino;
          var transacciones = await Transaccion.find({monedaOrigen: origen,monedaDestino: destino});
     }else{
        var transacciones =  await Transaccion.find();
     }
    res.json(transacciones);
}

transaccionController.saveTransaccion = async(req,res)=>{
     
    try{
         var transaccion = new Transaccion(req.body);
         await transaccion.save();
         res.json({
            "status":"1",
            "msg":"Se guardo la transaccion"
         })
    }catch(error){
        res.status(400).json({
            "status":"0",
            "msg":"No se guardo la Transaccion"
        })  
    }
} 

module.exports = transaccionController;



