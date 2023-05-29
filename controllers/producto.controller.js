const Producto = require('../models/Producto');
const productoController = {}

productoController.getProductos = async (req,res)=>{
    var productos = await Producto.find();
    res.json(productos);
}

productoController.saveProducto = async (req,res)=>{
   var producto = new Producto(req.body)
    try {
         await producto.save()
         res.json({
            "status":'1',
            "msg":"Producto guardado"
         })
    } catch (error) {
        res.status(400).json({
            "statuc":"0",
            "msg":"Producto no guardado"
        })
    }
}

productoController.getProducto= async (req,res)=>{
    var producto = await Producto.findById(req.params.id);
    res.json(producto);
}

productoController.editProducto = async (req,res)=>{
    const producto = new Producto(req.body);
    try {
          await Producto.updateOne({_id: req.body._id},producto);
          res.json({
            "status":"1",
            "msg":"Agente actualizado"
          }) 
    } catch (error) {
        res.status(400).json({
            "status":"0",
            "msg":"Error al modificar al producto"
        }) 
    }
}

productoController.deleteProducto = async (req,res)=>{
    try {
         await Producto.deleteOne({_id: req.params.id});
         res.json({
            "status":"1",
            "msg":"Producto Eliminado"
         })
    } catch (error) {
        res.status(400).json({
          "status":"0",
          "msg":"Error al eliminar producto"
        })
    }
}

module.exports = productoController;