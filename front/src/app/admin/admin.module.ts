import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { LayoutComponent } from './layout/layout.component';
import { AppLayoutModule } from './layout/app.layout.module';
import { FormularioService } from './inventario/services/formulario.service';
import { ProductoService } from './inventario/services/producto.service';

import { InventarioModule } from './inventario/inventario.module';
import { PedidoModule } from './pedido/pedido.module';

import { ClienteComponent } from './cliente/cliente.component';
import { UsuariosComponent } from './usuarios/usuarios.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

// PrimeNG modules (una sola vez cada uno)
import { TableModule } from 'primeng/table';
import { MenuModule } from 'primeng/menu';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { CardModule } from 'primeng/card';
import { DropdownModule } from 'primeng/dropdown';
import { AccordionModule } from 'primeng/accordion';
import { Dialog, DialogModule } from 'primeng/dialog';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    LayoutComponent,
    ClienteComponent,
    UsuariosComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    AppLayoutModule,
    InventarioModule, 
    PedidoModule,
    FormsModule,
    RouterModule,
    TableModule,
    InputTextModule,
    ButtonModule,
    // Angular
    ReactiveFormsModule,
    HttpClientModule,
    // PrimeNG
    MenuModule,
    CardModule,
    DropdownModule,
    AccordionModule,
    DialogModule,
    ProgressSpinnerModule
  ],
  providers: [
    FormularioService,
    ProductoService
  ]
})
export class AdminModule { }
