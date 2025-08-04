import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

interface Material {
  id: string;
  nombre: string;
  descripcion: string;
  stock: number;
}

@Component({
  selector: 'app-admin-reporte',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    InputTextModule,
    ButtonModule,
    TableModule,
    ToastModule
  ],
  providers: [MessageService],
  templateUrl: './admin-reporte.component.html',
  styleUrls: ['./admin-reporte.component.scss']
})
export class AdminReporteComponent {
  nombre = "";
  estado = '';
  descripcion = '';
  recomendacion = '';
  horapubl = '';  // ✅ AGREGA ESTO
  

  materialesUsados = [
    { nombre: 'Tomo NARUTO', cantidad: 10 },
    { nombre: 'tomo inuyasha ', cantidad: 5 },
    { nombre: 'tomo deadpool', cantidad: 3 }
  ];

  constructor(private messageService: MessageService) {}

  guardar() {
    this.messageService.add({
      severity: 'success',
      summary: 'Guardado',
      detail: 'Reporte guardado correctamente'
    });
  }

  generarPDF() {
    console.log('Generando PDF...');
    this.messageService.add({
      severity: 'info',
      summary: '',
      detail: ''
    });
  }
}
