const Producto = require('../models/Producto');
const productoController = {}

/**
 * @param {*} req 
 * @param {*} res 
 * Retorna todos los Productos
 */
productoController.getProductos = async (req,res)=>{
    var destacado = null;
    if (req.query.destacado != null){
         destacado = req.query.destacado
        var productos = await Producto.find({destacado:destacado});
    }else{
      var productos = await Producto.find();}
    res.json(productos);
}

/**
 * @param {*} req 
 * @param {*} res 
 * Guarda el Producto
 */
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

/**
 * @param {*} req 
 * @param {*} res
 * Retorna un solo Producto segun si ID 
 */
productoController.getProducto= async (req,res)=>{
    var producto = await Producto.findById(req.params.id);
    res.json(producto);
}

/**
 * @param {*} req 
 * @param {*} res 
 * Actualiza un Producto
 */
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

/**
 * @param {*} req 
 * @param {*} res
 * Elimina un Producto 
 */
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