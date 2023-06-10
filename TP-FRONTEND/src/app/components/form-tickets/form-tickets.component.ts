import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { isEmpty } from 'rxjs';
import { Espectador } from 'src/app/models/Espectador.model';
import { Ticket } from 'src/app/models/Ticket.model';
import { TicketService } from 'src/app/services/ticket.service';

@Component({
  selector: 'app-form-tickets',
  templateUrl: './form-tickets.component.html',
  styleUrls: ['./form-tickets.component.css']
})
export class FormTicketsComponent implements OnInit{

  fecha:Date;
  ticket:Ticket;
  descuento:number=0.20;
  tipo:boolean=false;
  precio!:number;
  vacioId:boolean=true;
  vacioCat:boolean=true;
  index:string="";
  titulo:string="Agregar Ticket";
  operacion:string="Agregar";
  mensaje:string='';
  espectadores:Array<Espectador>;
   constructor(private ticketService:TicketService,private actRoute:ActivatedRoute){
    this.fecha=new Date();
    this.ticket=new Ticket();
    this.ticket.categoriaEspectador="Local";
    this.espectadores=new Array<Espectador>();
   }

  ngOnInit():void {
     this.actRoute.params.subscribe(
      async params=>{
        if(params['id']=="0"){
          this.titulo="Agregar Ticket";
          this.operacion="Agregar";
          this.ticket=new Ticket();
        }else{
           this.titulo="Modificar Ticket";
           this.ticket = await this.findTicket(params["id"]);
          let idE=this.ticket.espectador.toString();
           this.ticket.espectador= await this.findEspectador(idE)
           this.tipo=true;
           this.operacion="Modificar";      
        }
      }
     )
       this.getEspectadores();
   }

   guardar(operacion:string){
    if (Object.keys(this.ticket.espectador).length == 0){
      this.vacioId=false;
    }else{
      if (operacion=="Modificar"){
       this.ticket.fechaCompra=this.fechaActual();
       this.ticketService.updateTicket(this.ticket)
       .subscribe(
        (res:any)=>{
          this.mensaje=res.msg
          console.log(res);
        },
        err=>{
          console.log(err);
        }
      )
      }else{
        
      this.ticket.fechaCompra=this.fechaActual()
      this.ticketService.saveTickets(this.ticket)
      .subscribe(
        (res:any)=>{
          this.mensaje=res.msg
          console.log(res);
        },
        err=>{
          console.log(err);
        }
      )}
      console.log(this.ticket);
    }
    
    setTimeout(() => {
      this.mensaje = '';
    }, 5000);
   }

    findTicket(id:string):Promise<any>{
     return new Promise<any>((resolve,reject)=>{this.ticketService.findTicket(id)
      .subscribe(
        (res:any)=>{
          resolve(res)
        },
        error=>{
          reject(error);
          console.log(error)
        }
      )
       
     }) 
   }

   async findEspectador(id: string): Promise<Espectador> {
    return new Promise((resolve, reject) => {
      this.ticketService.getEspectador(id)
        .subscribe(
          (res: any) => {
            let espectador = new Espectador();
            Object.assign(espectador, res);
            resolve(espectador);
          },
          err => {
            reject(err);
          }
        );
    });
  }

   cambio(tipo:any){
   // console.log(tipo.target.value)
     if (this.precio != null && tipo.target.value!=="Extranjero"){
        this.descuento= this.precio*0.20;
        this.ticket.precioTicket=this.precio-this.descuento;
        this.ticket.categoriaEspectador="Local";
     }else{
        this.ticket.precioTicket=this.precio;
        this.ticket.categoriaEspectador="Extranjero";
     }
     if (this.precio != null){
         this.tipo=true;
     }
   }

   addEspectador(idEsp:any){
      console.log(idEsp.target.value)
      this.ticket.espectador=idEsp.target.value;
      this.vacioId=true;
   }

   getEspectadores(){
      this.ticketService.getEspectadores()
      .subscribe(
        (res:any)=>{
          for(const element of res){
            let espectador = new Espectador();
            Object.assign(espectador,element);
            this.espectadores.push(espectador);
          }
          console.log(this.espectadores)
        },
        err=>{
         console.log(err)
        }
      )
   }

   fechaActual(){
    return new Date().toISOString().substring(0,10);
   }

}
