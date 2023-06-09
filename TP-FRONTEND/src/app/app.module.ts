import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HttpClientModule} from '@angular/common/http';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { ListProductosComponent } from './components/list-productos/list-productos.component';
import { FormProductosComponent } from './components/form-productos/form-productos.component'
import { FormsModule } from '@angular/forms';
import { FormTransaccionComponent } from './components/form-transaccion/form-transaccion.component';
import { ListTransaccionComponent } from './components/list-transaccion/list-transaccion.component';
import { ListTicketsComponent } from './components/list-tickets/list-tickets.component';
import { FormTicketsComponent } from './components/form-tickets/form-tickets.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    ListProductosComponent,
    FormProductosComponent,
    FormTransaccionComponent,
    ListTransaccionComponent,
    ListTicketsComponent,
    FormTicketsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
