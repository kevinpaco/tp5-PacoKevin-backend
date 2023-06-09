import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Transaccion } from '../models/Transaccion.model';

@Injectable({
  providedIn: 'root'
})
export class TransaccionService {

  to:string;
  from:string;
  amount:number;
  constructor(private http:HttpClient) { 
    this.to='';
    this.from='';
    this.amount=0;
  }

  modendas(){
     const httpOptions={
      headers:new HttpHeaders({
        'X-RapidAPI-Key': 'e63f54f093msh7ecd5d0b0e65948p11ebe4jsn30216db0ee66',
        'X-RapidAPI-Host': 'currency-converter18.p.rapidapi.com'
      })
     }

     return this.http.get("https://currency-converter18.p.rapidapi.com/api/v1/supportedCurrencies",httpOptions);
  }


  public getConverted(from:string,to:string,amount:number):Observable<any>{
    const url = 'https://community-neutrino-currency-conversion.p.rapidapi.com/convert';
   
    this.to = to;
    this.from = from;
    this.amount = amount;

    const httpOptions ={
      headers:new HttpHeaders({
        'content-type': 'application/x-www-form-urlencoded',
        'X-RapidAPI-Host':'community-neutrino-currency-conversion.p.rapidapi.com',
        'X-RapidAPI-Key': 'e63f54f093msh7ecd5d0b0e65948p11ebe4jsn30216db0ee66',   
      }),
    }

    const body=new HttpParams()
    .set('from-value',amount)
    .set('from-type',from)
    .set('to-type',to)
    
    return this.http.post('https://community-neutrino-currency-conversion.p.rapidapi.com/convert',body, httpOptions);
  }

  tasaConversion(from:string,to:string){
    const httpOptions ={
      headers:new HttpHeaders({
        'X-RapidAPI-Key': 'e63f54f093msh7ecd5d0b0e65948p11ebe4jsn30216db0ee66',
        'X-RapidAPI-Host': 'currency-converter-pro1.p.rapidapi.com'   
      }),
       params:{
        from: from,
        to: to,
        amount: '1'
         }
    };
    return this.http.get("https://currency-converter-pro1.p.rapidapi.com/convert",httpOptions);
  }

  getTransactions(){
    
    const httpOptions = {
      headers:new HttpHeaders({

      })
    } 
    return this.http.get("http://localhost:3000/api/transaccion/",httpOptions);
  }

  filterTransacctions(origen:string,destino:string){
    const httpOptions = {
      headers:new HttpHeaders({

      })
    } 
    const params = new HttpParams()
    .set("origen",origen)
    .set("destino",destino)
    return this.http.get("http://localhost:3000/api/transaccion/",{params, ...httpOptions});
  }

  postTransactions(transaction:Transaccion){
    const httpOptions = {
      headers:new HttpHeaders({
        "Content-type":"application/json"
      })
    } 
   let body= JSON.stringify(transaction);
    return this.http.post("http://localhost:3000/api/transaccion/",body,httpOptions);
  }

}
