const espectadorCtl = require('../controllers/espectador.controller');

const express = require('express');
const route = express.Router();

route.get("/",espectadorCtl.getEspectadores);
route.post("/",espectadorCtl.saveEspectador);
route.get("/:id",espectadorCtl.getEspectador);

module.exports = route;