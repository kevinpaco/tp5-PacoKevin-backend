import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListProductosComponent } from './components/list-productos/list-productos.component';
import { FormProductosComponent } from './components/form-productos/form-productos.component';
import { FormTransaccionComponent } from './components/form-transaccion/form-transaccion.component';
import { ListTransaccionComponent } from './components/list-transaccion/list-transaccion.component';
import { ListTicketsComponent } from './components/list-tickets/list-tickets.component';
import { FormTicketsComponent } from './components/form-tickets/form-tickets.component';

const routes: Routes = [
  {path:"",component:FormProductosComponent},
  {path:"productos", component : ListProductosComponent},
  {path:"form-producto",component:FormProductosComponent},
  {path:"form-transaccion",component:FormTransaccionComponent},
  {path:"transacciones",component:ListTransaccionComponent},
  {path:"tickets",component:ListTicketsComponent},
  {path:"form-ticket/:id",component:FormTicketsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
