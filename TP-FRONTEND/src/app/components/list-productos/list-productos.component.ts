import { Component, OnInit } from '@angular/core';
import { Producto } from 'src/app/models/producto.model';
import { ProductoService } from 'src/app/services/producto.service';

@Component({
  selector: 'app-list-productos',
  templateUrl: './list-productos.component.html',
  styleUrls: ['./list-productos.component.css']
})
export class ListProductosComponent implements OnInit {

  productos:Array<Producto>;
  recorridoCarrusel:number=0;
  constructor(private prodService:ProductoService){
    this.productos=new Array<Producto>();
  }

  ngOnInit(): void {
      this.getProductos()
  }

  getProductos(){
    this.prodService.getProductos(true)
    .subscribe(
      (res:any)=>{
          res.forEach((element:any) => {
            let prod = new Producto();
            Object.assign(prod,element);
            this.productos.push(prod);
          });
       },
       err=>{
        console.log(err);
       }
      
    )
  }

  productoSiguiente() {
    if (this.recorridoCarrusel === this.productos.length - 1) {
      this.recorridoCarrusel = 0; // Vuelve al primer producto cuando llega al último
    } else {
      this.recorridoCarrusel++; // Avanza al siguiente producto
    }
  }

  productoAnterior() {
    if (this.recorridoCarrusel === 0) {
      this.recorridoCarrusel = this.productos.length - 1; // Retrocede al último producto cuando está en el primero
    } else {
      this.recorridoCarrusel--; // Retrocede al producto anterior
    }
  }
}
