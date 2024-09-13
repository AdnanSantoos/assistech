import { Component} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LayoutTableComponent } from '../../shared/containers/layout-table/layout-table.component';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-audiencias-publicas',
  standalone: true,
  imports: [LayoutTableComponent,
    CommonModule,
    ReactiveFormsModule,
    MatIconModule,
    MatButtonModule],
  templateUrl: './audiencias-publicas.component.html',
  styleUrl: './audiencias-publicas.component.scss'
})
export class AudienciasPublicasComponent {
  filtroForm: FormGroup;
  displayedColumns: string[] = ['titulo', 'data', 'arquivo'];
  dataSource = [
    { titulo: 'a', data: '14/11/2023', arquivo: 'link-to-arquivo-70' },
    { titulo: 'b', data: '14/11/2023', arquivo: 'link-to-arquivo-69' },
    { titulo: 'c', data: '14/11/2023', arquivo: 'link-to-arquivo-68' },
    { titulo: 'd', data: '14/11/2023', arquivo: 'link-to-arquivo-67' },
    { titulo: 'e', data: '14/11/2023', arquivo: 'link-to-arquivo-66' },
  ];

  constructor(private fb: FormBuilder) {
    this.filtroForm = this.fb.group({
      ataDaSessao: [''],
      day: [''],
      month: [''],
      year: ['']
    });
  }

  onFormSubmit() {
  }
}
