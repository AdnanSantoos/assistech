import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { LayoutFormsAdmComponent } from '../../shared/containers/layout-forms-adm/layout-forms-adm.component';

@Component({
  selector: 'app-pedidos-providencia-administrativo',
  standalone: true,
  imports: [LayoutFormsAdmComponent,
    CommonModule,
    ReactiveFormsModule,
    MatIconModule,
    MatButtonModule],
  templateUrl: './pedidos-providencia-administrativo.component.html',
  styleUrl: './pedidos-providencia-administrativo.component.scss'
})
export class PedidosProvidenciaAdministrativoComponent {

  filtroForm: FormGroup;
  dynamicFields: any[];

  constructor(private fb: FormBuilder) {
    this.filtroForm = this.fb.group({
      ataDaSessao: [''],
      day: [''],
      month: [''],
      year: [''],
      file: [null]
    });

    this.dynamicFields = [
      { name: 'numeroDoPedido', type: 'text', label: 'nº do pedido' },
      { name: 'vereador', type: 'text', label: 'vereador' },
      { name: 'anoDoPedido', type: 'text', label: 'Ano do pedido' },
      { name: 'conteudo', type: 'textarea', label: 'conteúdo' },
      { name: 'file', type: 'file', fileType: 'complex', label: '' }
    ];

  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.filtroForm.patchValue({
        file: file
      });
    }
  }

  onFormSubmit() {
    console.log(this.filtroForm.value);
  }
}
