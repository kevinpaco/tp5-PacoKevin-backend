import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Ticket } from '../models/Ticket.model';

@Injectable({
  providedIn: 'root'
})
export class TicketService {

  url:string="http://localhost:3000/api/ticket/";
  constructor(private http:HttpClient) { }

  getTickets(){
     const httpOptions={
      headers:new HttpHeaders({
      
     }),
     }

     return this.http.get(this.url,httpOptions);
  }
  filtrarTickets(categoria:string){
    const httpOptions={
     headers:new HttpHeaders({
     
    }),
    }
   const params=new HttpParams()
    .set("categoria",categoria)
    return this.http.get(this.url,{params, ...httpOptions});
 }

 saveTickets(ticket:Ticket){
  const httpOptions={
    headers:new HttpHeaders({
      "Content-type":"application/json"
   }),
   }
   let body = JSON.stringify(ticket);
   return this.http.post(this.url,body,httpOptions);
 }

 findTicket(id:string){
  const httpOptions={
    headers:new HttpHeaders({
     
   }),
   }
   return this.http.get(this.url+id,httpOptions);
 }

  updateTicket(ticket:Ticket){
    const httpOptions={
      headers:new HttpHeaders({
        "Content-type":"application/json"
     }),
     }
     let body = JSON.stringify(ticket);
     return this.http.put(this.url+ticket._id,body,httpOptions);
  }

 deleteTicket(id:string){
  const httpOptions={
    headers:new HttpHeaders({
     
   }),
   }
   return this.http.delete(this.url+id,httpOptions);
 }

  getEspectador(id:string){
    const httpOptions={
      headers:new HttpHeaders({
      
     }),
     }
     
     return this.http.get("http://localhost:3000/api/espectadores/"+id,httpOptions);
  }

  getEspectadores(){
    const httpOptions={
      headers:new HttpHeaders({
      
     }),
     }
     
     return this.http.get("http://localhost:3000/api/espectadores/",httpOptions);
  }
}
