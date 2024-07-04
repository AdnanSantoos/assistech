import { Component} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LayoutTableComponent } from '../../shared/containers/layout-table/layout-table.component';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-ata-das-sessoes',
  standalone: true,
  imports: [
    LayoutTableComponent,
    CommonModule,
    ReactiveFormsModule,
    MatIconModule,
    MatButtonModule
  ],
  templateUrl: './ata-das-sessoes.component.html',
  styleUrls: ['./ata-das-sessoes.component.scss']
})
export class AtaDasSessoesComponent {
  filtroForm: FormGroup;
  displayedColumns: string[] = ['ata', 'data', 'download'];
  dataSource = [
    { ata: '70/2023', data: '14/11/2023', download: 'link-to-download-70' },
    { ata: '69/2023', data: '14/11/2023', download: 'link-to-download-69' },
    { ata: '68/2023', data: '14/11/2023', download: 'link-to-download-68' },
    { ata: '67/2023', data: '14/11/2023', download: 'link-to-download-67' },
    { ata: '66/2023', data: '14/11/2023', download: 'link-to-download-66' },
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
    console.log(this.filtroForm)
  }
}
