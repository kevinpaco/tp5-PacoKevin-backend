const ticketCtl = require('../controllers/ticket.controller');

const express = require('express');

const route = express.Router();

route.get("/",ticketCtl.getTickets);
route.post("/",ticketCtl.postTicket);
route.put("/:id",ticketCtl.putTicket);
route.delete("/:id",ticketCtl.deleteTicket);

module.exports = route;