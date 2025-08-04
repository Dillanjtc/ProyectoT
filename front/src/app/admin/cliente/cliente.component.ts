import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.scss'],
})
export class ClienteComponent {
  clienteForm: FormGroup;
  visible: boolean = false;

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.clienteForm = this.fb.group({
      codigoPostal: ['', Validators.required],
      provincia: ['', Validators.required],
      ciudad: [''],
      callePrincipal: ['', Validators.required],
      calleSecundaria: ['', Validators.required],
    });
  }

  showDialog() {
    this.visible = true;
  }

  guardar() {
    console.log('Estado del formulario:', this.clienteForm.status);
    console.log('Datos:', this.clienteForm.value);

    if (this.clienteForm.invalid) {
      this.clienteForm.markAllAsTouched();
      alert('Por favor llena todos los campos obligatorios correctamente.');
      return;
    }

    const datos = this.clienteForm.value;

    // Idealmente abstraer esta URL a un environment.ts
    this.http.post('http://localhost:3000/clientes', datos).subscribe({
      next: () => {
        alert('Datos guardados con éxito');
        // opcional: resetear formulario o cerrar diálogo
        this.clienteForm.reset();
        this.visible = false;
      },
      error: (err) => {
        console.error('Error al guardar:', err);
        alert('Error al guardar los datos');
      },
    });
  }

  // helpers para la plantilla
  campoValido(campo: string): boolean {
    const control = this.clienteForm.get(campo);
    return !!(control && control.valid && (control.touched || control.dirty));
  }

  campoInvalido(campo: string): boolean {
    const control = this.clienteForm.get(campo);
    return !!(control && control.invalid && (control.touched || control.dirty));
  }
}
