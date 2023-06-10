import { Component, OnInit } from '@angular/core';
import { Transaccion } from 'src/app/models/Transaccion.model';
import { TransaccionService } from 'src/app/services/transaccion.service';

@Component({
  selector: 'app-list-transaccion',
  templateUrl: './list-transaccion.component.html',
  styleUrls: ['./list-transaccion.component.css']
})
export class ListTransaccionComponent implements OnInit {
  
  origen:string="";
  destino:string="";
  transaccion:Transaccion;
  transacciones:Array<Transaccion>;
  constructor(private tranService:TransaccionService){
    this.transaccion=new Transaccion();
    this.transacciones=new Array<Transaccion>();
   }

  ngOnInit(): void {
      this.getTransacciones();
  }
  
  getTransacciones(){
    this.transacciones=[];
    this.tranService.getTransactions()
    .subscribe(
      (res:any)=>{
        res.forEach((element:any) => {
            let transaccion = new Transaccion();
            Object.assign(transaccion,element);
            this.transacciones.push(transaccion);
        });
        console.log(this.transacciones)
      },
      err=>{
        console.log(err)
      }
    )
  }

  filtrarTransacciones(){
    this.transacciones=[];
    this.tranService.filterTransacctions(this.origen,this.destino)
    .subscribe(
      (res:any)=>{
        res.forEach((element:any) => {
            let transaccion = new Transaccion();
            Object.assign(transaccion,element);
            this.transacciones.push(transaccion);
        });
        console.log(this.transacciones)
      },
      err=>{
        console.log(err)
      }
    )
  }

}
