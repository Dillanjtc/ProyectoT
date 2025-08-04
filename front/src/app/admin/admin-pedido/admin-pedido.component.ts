import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { RippleModule } from 'primeng/ripple';
import { ButtonModule } from 'primeng/button';
import { RouterModule } from '@angular/router';  // ← Nuevo

@Component({
  selector: 'app-admin-pedido',
  standalone: true,
  imports: [CommonModule, CardModule, RippleModule, ButtonModule, RouterModule], // ← Agregado RouterModule
  templateUrl: './admin-pedido.component.html',
  styleUrls: ['./admin-pedido.component.scss']
})
export class AdminPedidoComponent {
  pedidos = [
    { id: '01', empresa: '', detalle: 'El detalle viene del cliente', codigopostal: '123',provincia:'pichincha',ciudad:'quito',callePrincipal:'calle o', calleSecundario:'calle oa', expanded: true },
    { id: '02', empresa: '', detalle: 'Otro detalle', codigopostal: '123',provincia:'pichincha',ciudad:'quito',callePrincipal:'calle o', calleSecundario:'calle oa',expanded: false },
    { id: '03', empresa: '', detalle: 'Más detalles', codigopostal: '123',provincia:'pichincha',ciudad:'quito',callePrincipal:'calle o', calleSecundario:'calle oa',expanded: false },
    { id: '04', empresa: '', detalle: 'Detalle adicional', codigopostal: '123',provincia:'pichincha',ciudad:'quito',callePrincipal:'calle o', calleSecundario:'calle oa',expanded: false }
  ];

  toggleExpand(pedido: any) {
    pedido.expanded = !pedido.expanded;
  }
}
