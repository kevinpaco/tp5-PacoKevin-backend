//defino controlador para le majo del CRUD
const productoCtl = require("../controllers/producto.controller")

//manejador de rutas
const express = require('express');
const route = express.Router();

//definion de rutas
route.get("/",productoCtl.getProductos);
route.post("/",productoCtl.saveProducto);
route.get("/:id",productoCtl.getProducto);
route.put("/:id",productoCtl.editProducto);
route.delete("/:id",productoCtl.deleteProducto);

module.exports = route;
