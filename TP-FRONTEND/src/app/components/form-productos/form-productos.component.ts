import { Component } from '@angular/core';
import { Producto } from 'src/app/models/producto.model';
import { ProductoService } from 'src/app/services/producto.service';

@Component({
  selector: 'app-form-productos',
  templateUrl: './form-productos.component.html',
  styleUrls: ['./form-productos.component.css']
})
export class FormProductosComponent {
    
  producto:Producto;
  guardado:string="";
  constructor(private prodService:ProductoService){
    this.producto=new Producto();
    this.producto.destacado=false;
  }
 
  prodDestacado(event:any){
   this.producto.destacado=event.target.checked;
  }
  guardarProducto(){
        
    this.prodService.postProducto(this.producto)
    .subscribe(
      (res:any)=>{
        this.guardado=res.msg;
        console.log(res)
      },
      err=>{
        console.log(err)
      }
    )
    alert(this.guardado);
    this.limpiarCampos();
  }

  limpiarCampos(){
     this.producto=new Producto();
  }

  
}
