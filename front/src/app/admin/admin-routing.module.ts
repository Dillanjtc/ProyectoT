// src/app/admin/admin-routing.module.ts

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppLayoutComponent }         from './layout/app.layout.component';
import { formularioComponent }         from './inventario/components/formulario/formulario.component';
import { ProductoComponent }          from './inventario/components/producto/producto.component';
import { NuevoPedidoComponent }       from './pedido/components/nuevo-pedido/nuevo-pedido.component';
import { ListaPedidoComponent }       from './pedido/components/lista-pedido/lista-pedido.component';
import { ClienteComponent }           from './cliente/cliente.component';
import { ReporteComponent }           from './reporte/reporte.component';
import { UsuariosComponent }          from './usuarios/usuarios.component';

import { authGuard } from '../guards/auth.guard';
import { AdminPedidoComponent } from './admin-pedido/admin-pedido.component';
import { AdminReporteComponent } from './admin-reporte/admin-reporte.component';
import { ListaClienteComponent } from './lista-cliente/lista-cliente.component';

import { FormularioComponent } from './formulario/formulario.component';
const routes: Routes = [
  {
    path: '',
    component: AppLayoutComponent,
    children: [
      {
        path: 'formulario',
        component: formularioComponent,
        canActivate: [ authGuard('admin') ]
      },
      {
        path: 'reporte',
        component: AdminReporteComponent,
        canActivate: [ authGuard('admin') ]
      },
      {
        path: 'lista-cliente',
        component: ListaClienteComponent,
        canActivate: [ authGuard('admin') ]
      },
      {
        path: 'pedidos',
        component: AdminPedidoComponent,
        canActivate: [ authGuard('admin') ]
      },
      {
        path: 'producto',
        component: ProductoComponent,
        canActivate: [ authGuard('') ]
      },
      {
        path: 'reporte',
        component: ReporteComponent,
        canActivate: [ authGuard('') ]
      },
      {
        path: 'cliente',
        component: ClienteComponent,
        canActivate: [ authGuard('client') ]
      },
      {
        path: 'pedido/nuevo',
        component: NuevoPedidoComponent,
        canActivate: [ authGuard('admin') ]
      },
      {
        path: 'pedido',
        component: ListaPedidoComponent,
        canActivate: [ authGuard('admin') ]
      },
      {
        path: 'usuarios',
        component: UsuariosComponent,
        canActivate: [ authGuard('admin') ]
      },
      {
        path: 'formularioT',
        component: FormularioComponent,
        canActivate: [ authGuard('admin') ]
      },
      {
        path: '',
        redirectTo: 'inicio',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class AdminRoutingModule {}
