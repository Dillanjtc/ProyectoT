import { Component, inject, OnInit } from '@angular/core';
import { FormularioService } from '../../services/formulario.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import jsPDF from 'jspdf';
import autotable from 'jspdf-autotable';

interface formulario {
  id: number;
  fecha?: string;
  serie: string | null;
  tipo?: string;
  descripcion?: string;
  recomendado?: string;
}

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.scss']
})
export class formularioComponent implements OnInit {
highlightRow($event: MouseEvent,arg1: string) {
throw new Error('Method not implemented.');
}
  private FormularioService = inject(FormularioService);
  formularios: formulario[] = [];
  dialog_visible = false;
  formulario_id = -1;
  isSaving = false;

  formularioForm = new FormGroup({
    fecha: new FormControl('', Validators.required),
    serie: new FormControl('', Validators.required),
    tipo: new FormControl('', Validators.required),
    descripcion: new FormControl('', Validators.required),
    recomendado: new FormControl('', Validators.required)
  });

  ngOnInit(): void {
    this.getformularios();
  }

  getformularios() {
    this.FormularioService.funListar().subscribe({
      next: (res: any) => this.formularios = res,
      error: (err: any) => console.error(err)
    });
  }

  mostrarDialog() {
    this.formulario_id = -1;
    this.formularioForm.reset();
    this.dialog_visible = true;
  }

  cerrarDialog(): void {
    this.dialog_visible = false;
    setTimeout(() => {
      if (document.activeElement instanceof HTMLElement) document.activeElement.blur();
    }, 0);
  }

  guardarformulario() {
  const data: any = { ...this.formularioForm.value };

  if (data.fecha) {
    const f = new Date(data.fecha);
    data.fecha = `${f.getFullYear()}-${String(f.getMonth() + 1).padStart(2, '0')}-${String(f.getDate()).padStart(2, '0')}`;
  }

  console.log('📤 Enviando al backend:', data); // <-- IMPORTANTE

  this.isSaving = true;

  const request$ = this.formulario_id > 0
    ? this.FormularioService.funModificar(this.formulario_id, data)
    : this.FormularioService.funGuardar(data);

  request$.subscribe({
    next: () => {
      console.log('✅ Guardado con éxito');
      this.isSaving = false;
      this.cerrarDialog();
      this.getformularios();
      this.alerta(this.formulario_id > 0 ? 'ACTUALIZADO' : 'REGISTRADO', '¡Operación exitosa!', 'success');
      this.formulario_id = -1;
      this.formularioForm.reset();
    },
    error: (err) => {
      this.isSaving = false;
      console.error('❌ ERROR AL GUARDAR:', err); // <-- AQUÍ VERÁS EL ERROR REAL
      this.alerta('ERROR AL REGISTRAR', err?.error?.message || 'Error desconocido', 'error');
    }
  });
}

  editarformulario(formulario: formulario): void {
    this.formulario_id = formulario.id;
    this.dialog_visible = true;
    this.formularioForm.reset();

    const [fecha] = formulario.fecha?.split('T') ?? [''];

    this.formularioForm.patchValue({
      fecha,
      serie: formulario.serie ?? '',
      tipo: formulario.tipo ?? '',
      descripcion: formulario.descripcion ?? '',
      recomendado: formulario.recomendado ?? ''
    });
  }

  eliminarformulario(cat: formulario) {
    Swal.fire({
      title: '¿Eliminar formulario?',
      text: '¡No podrás revertirlo!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33'
    }).then(result => {
      if (result.isConfirmed) {
        this.FormularioService.funEliminar(cat.id).subscribe({
          next: (mensaje) => {
            const texto = String(mensaje);
            this.alerta('ELIMINADO', texto, 'success');
            this.getformularios();
            this.formulario_id = -1;
          },
          error: (err) => {
            console.error('Error al eliminar formulario', err);
            this.alerta('ERROR', 'Error al eliminar el formulario', 'error');
          }
        });
      }
    });
  }

  alerta(title: string, text: string, icon: 'success' | 'error' | 'info' | 'question') {
    Swal.fire({ title, text, icon });
  }

  private loadImageAsDataUrl(url: string): Promise<string> {
    return fetch(url)
      .then(res => res.blob())
      .then(blob => new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(blob);
      }));
  }

  async generarPDFformulario(cat: formulario): Promise<void> {
    const doc = new jsPDF();

    try {
      const dataUrl = await this.loadImageAsDataUrl('assets/layout/images/Logo-FRIGO.jpg');
      doc.addImage(dataUrl, 'JPG', 127, 10, 70, 25);
    } catch (err) {
      console.warn('No se pudo cargar el logo desde assets:', err);
    }

    doc.setFontSize(18);
    doc.text("Formulario", 90, 10);

    doc.setFontSize(12);
    if (cat.fecha) {
      doc.text('Fecha: ' + cat.fecha, 10, 25);
    }

    doc.setFontSize(13);
    doc.text('Información:', 10, 40);

    const datos = [
      ['Serie', cat.serie || ''],
      ['Tipo', cat.tipo || ''],
      ['Descripción', cat.descripcion || ''],
      ['Recomendado', cat.recomendado || '']
    ];

    autotable(doc, {
      startY: 45,
      head: [['Campo', 'Valor']],
      body: datos,
      styles: {
        fontSize: 11,
        cellPadding: 4,
        fillColor: [255, 255, 255]
      },
      headStyles: {
        fillColor: [243, 146, 0],
        textColor: 255,
        fontStyle: 'bold'
      },
      alternateRowStyles: {
        fillColor: [240, 245, 255]
      },
      tableLineWidth: 0.1,
      tableLineColor: [200, 200, 200]
    });

    doc.save(`Informe_${cat.id}-${cat.fecha}.pdf`);
  }
}
