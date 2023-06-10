import { emitDistinctChangesOnlyDefaultValue } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import {  Router } from '@angular/router';
import { Espectador } from 'src/app/models/Espectador.model';
import { Ticket } from 'src/app/models/Ticket.model';
import { TicketService } from 'src/app/services/ticket.service';

@Component({
  selector: 'app-list-tickets',
  templateUrl: './list-tickets.component.html',
  styleUrls: ['./list-tickets.component.css']
})
export class ListTicketsComponent implements OnInit{

   ticket!:Ticket;
   tickets!:Array<Ticket>;
   categoria:string="";
   constructor(private route:Router,private ticService:TicketService){
    this.tickets=new Array<Ticket>();
   }

   ngOnInit(): void {
       this.listTickets();
   }

   listTickets(){
    this.tickets=[];
    this.ticService.getTickets()
    .subscribe(
      async (res:any)=>{
        for (const element of res) {
          let ticket = new Ticket();
          Object.assign(ticket, element);         
          let espectador = await this.findEspectador(element.espectador);          
          ticket.espectador = espectador;
          console.log(ticket.espectador.nombre);
          this.tickets.push(ticket);
        }
      }
    )
   }

   async findEspectador(id: string): Promise<Espectador> {
    return new Promise((resolve, reject) => {
      this.ticService.getEspectador(id)
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
 
  filtrarCategoria(){

    this.tickets=[];
    this.ticService.filtrarTickets(this.categoria)
    .subscribe(
      async (res:any)=>{
        for (const element of res) {
          let ticket = new Ticket();
          Object.assign(ticket, element);         
          let espectador = await this.findEspectador(element.espectador);          
          ticket.espectador = espectador;
          console.log(ticket.espectador.nombre);
          this.tickets.push(ticket);
        }
      }
    )
  }

  eliminarTicket(id:any){

    this.ticService.deleteTicket(id)
  .subscribe(
    (res:any)=>{
      console.log(res)
      this.listTickets();
    },
    err=>{
      console.log(err)
    }
  )
  }

  modTicket(id:any){
     this.route.navigate(["form-ticket/",id])
     console.log(id)
  }
  
}