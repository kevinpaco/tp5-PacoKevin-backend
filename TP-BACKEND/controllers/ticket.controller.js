const Ticket = require('../models/Ticket');

const ticketCtl = {}

/**
 * @param {*} req 
 * @param {*} res
 * Recibe un parametro de categoria y retorna los tipos de categoria
 * Si no recibe parametro retorna todo
 */
ticketCtl.getTickets = async (req,res)=>{
    let espectadorTipo=null;
    if (req.query.categoria != null){
        espectadorTipo = req.query.categoria;
        var tickets = await Ticket.find({categoriaEspectador:espectadorTipo});
    }else{
        var tickets = await Ticket.find();}
    res.json(tickets);
}

/**
 * @param {*} req 
 * @param {*} res 
 * Guarda un ticket
 */
ticketCtl.postTicket = async (req,res)=>{
    var ticket = new Ticket(req.body);
    try{
         await ticket.save();
         res.json({
            "status":"1",
            "msg":"El ticket se guardo correctamente"
         })
    }catch(error){
        res.status(400).json({
            "status":"0",
            "msg":"El ticket no se guardo correctamente"+error
        })
    }
}

/**
 * @param {*} req 
 * @param {*} res
 * Actualiza un ticket 
 */
ticketCtl.putTicket = async (req,res)=>{
    try{
        var ticket = new Ticket(req.body);
        await Ticket.updateOne({_id:req.body._id},ticket);
        res.json({
            "status":"1",
            "msg":"El ticket se actializo correctamente"
        })
    }catch(error){
            res.status(400).json({
                "status":"0",
                "msg":"El ticket no se actializo: "+error
            })
    }
}

/**
 * @param {*} req 
 * @param {*} res 
 * Elimina un ticket
 */
ticketCtl.deleteTicket = async (req,res)=>{
    try{
        await Ticket.deleteOne({_id: req.params.id}); 
        res.json({
            "status":"1",
            "msg":"El ticket fue eliminado"
        })
    }catch(error){
       res.json({
        "status":"0",
            "msg":"El ticket no fue eliminado"
       })
    }
}

module.exports = ticketCtl;