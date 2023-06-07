const transaccionCtrl= require('../controllers/transaccione.controller');

const express = require('express');
const route = express.Router();

route.get("/",transaccionCtrl.getTransacciones);
route.post("/",transaccionCtrl.saveTransaccion);

module.exports = route;