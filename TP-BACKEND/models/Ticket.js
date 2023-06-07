const mongoose = require('mongoose');

const {Schema} = mongoose;
const Espectador = require('./Espectador');
const TicketSchema =new Schema({
    precioTicket:{type:Number,required:true},
    categoriaEspectador:{type:String,required:true},
    fechaCompra:{type:String,required:true},
    espectador:{type: Schema.Types.ObjectId,ref: Espectador,required:false}
});

module.exports = mongoose.models.Ticket || mongoose.model("Ticket",TicketSchema);