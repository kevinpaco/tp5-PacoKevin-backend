import { Espectador } from "./Espectador.model";

export class Ticket{
    _id?:string;
    precioTicket?:number;
    categoriaEspectador?:string;
    fechaCompra?:string;
    espectador:Espectador=new Espectador();

   /* constructor(espectador:Espectador){
        this.espectador=espectador;
    }*/
}