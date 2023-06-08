import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Producto } from '../models/producto.model';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  url:string;

  constructor(private http:HttpClient) { 
    this.url="http://localhost:3000/api/producto/";
  }

  getProductos(destacado:boolean){
     const httpOptions={
       headers:new HttpHeaders({

       })
     }
     const params = new HttpParams()
     .set('destacado',destacado);

    return this.http.get(this.url,{params, ...httpOptions});
  }

  postProducto(producto:Producto){
    const httpOptions={
      headers:new HttpHeaders({
       "Content-type":"application/json"
      })
    }
    let body=JSON.stringify(producto);
   return this.http.post(this.url,body,httpOptions);
 }
}
