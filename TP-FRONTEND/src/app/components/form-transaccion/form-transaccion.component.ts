import { Component, OnInit } from '@angular/core';
import { Moneda } from 'src/app/models/Moneda.model';
import { Transaccion } from 'src/app/models/Transaccion.model';
import { TransaccionService } from 'src/app/services/transaccion.service';

@Component({
  selector: 'app-form-transaccion',
  templateUrl: './form-transaccion.component.html',
  styleUrls: ['./form-transaccion.component.css']
})
export class FormTransaccionComponent implements OnInit{
operador:number=0;
de:string;
a:string;
resultado:number=0;
tasaTransaccion:number=0;
transaccion:Transaccion;
monedas:Array<Moneda>;
 constructor(private service:TransaccionService){
   this.transaccion=new Transaccion();
   this.monedas=[];
    this.de="USD";
    this.a="USD";
   
 }

 ngOnInit(): void {
     this.cargarMonedas();
 }

 traerMonedas():Promise<any>{
    
 return new Promise<any>((resolve,reject)=>{ this.service.modendas()
   .subscribe(
      (res:any)=>{
           resolve(res);
      },
      error=>{
         reject(error);
         console.log(error);
      }
   )});
 }

 async cargarMonedas(){
     const f= await this.traerMonedas();
     for (let i of f){
      console.log(i)
      this.monedas.push(new Moneda(i.symbol,i.name));
     }
 }

tipo(tipo:any){
   this.de=tipo.target.value;
  
}
tipo2(tipo2:any){
   this.a=tipo2.target.value;      
}

async convertir(){
 console.log(this.resultado)
 if (this.operador==0){
    alert("Por Favor introduca un valor diferente a cero")
 }
 await this.service.getConverted(this.de,this.a,this.operador)
   .subscribe(
      async res=>{
         this.resultado=await res.result;
         console.log(res);
        await this.tasatransaccion();
       
      },
      error=>{
        console.log(error);
      }
   );     
}

 tasatransaccion(){
   this.service.tasaConversion(this.de,this.a)
   .subscribe(
      async (res:any)=>{
         this.tasaTransaccion=await res.result;
         await this.guardarTransaccion();
         console.log("tasa: "+res.result)
      },
      err=>{
         console.log(err)
      }
   )
 }
 
   guardarTransaccion(){
   this.transaccion.cantidadOrigen=this.operador;
   this.transaccion.monedaOrigen=this.de;
   this.transaccion.cantidadDestino=this.resultado;
   this.transaccion.monedaDestino=this.a;
   this.transaccion.tasaConvercion=this.tasaTransaccion;
    this.service.postTransactions(this.transaccion)
   .subscribe(
      (res:any)=>{
         console.log("Guardar: "+res);
      },
      err=>{
         console.log(err);
      }
   )
  }
}
