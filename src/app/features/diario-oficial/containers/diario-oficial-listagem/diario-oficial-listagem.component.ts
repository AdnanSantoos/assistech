import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { DiarioOficialLayoutComponent } from '../diario-oficial-layout/diario-oficial-layout.component';
import { MatIcon } from '@angular/material/icon';

interface Document {
  edicao: number;
  natureza: string;
  dataPublicacao: Date;
  descricao: string;
  link: string;
}

@Component({
  selector: 'app-diario-oficial-listagem',
  standalone: true,
  imports: [CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatIcon,
    RouterLink,
    MatButtonModule,
    DiarioOficialLayoutComponent],
  templateUrl: './diario-oficial-listagem.component.html',
  styleUrl: './diario-oficial-listagem.component.scss'
})
export class DiarioOficialListagemComponent {
  filterForm: FormGroup;

  documents: Document[] = [
    { edicao: 1, natureza: 'DOCUMENTO OFICIAL', dataPublicacao: new Date('2022-01-31'), descricao: 'TERMO DE POSSE 2022', link: '/diario-oficial-visualizacao' },
    { edicao: 2, natureza: 'DOCUMENTO OFICIAL', dataPublicacao: new Date('2022-01-29'), descricao: 'DEC. Nº 01 A 05 – 2022', link: '/diario-oficial-visualizacao' },
    { edicao: 3, natureza: 'DOCUMENTO OFICIAL', dataPublicacao: new Date('2022-01-27'), descricao: 'DEC. Nº 210– 2022', link: '/diario-oficial-visualizacao' },
    { edicao: 4, natureza: 'DOCUMENTO OFICIAL', dataPublicacao: new Date('2022-01-24'), descricao: 'DEC. Nº 06 A 08 – 2022', link: '/diario-oficial-visualizacao' },
    { edicao: 5, natureza: 'DOCUMENTO OFICIAL', dataPublicacao: new Date('2022-01-22'), descricao: 'DEC Nº 09', link: '/diario-oficial-visualizacao' },
    { edicao: 6, natureza: 'DOCUMENTO OFICIAL', dataPublicacao: new Date('2022-01-20'), descricao: 'DEC Nº 10', link: '/diario-oficial-visualizacao' },
    { edicao: 7, natureza: 'DOCUMENTO OFICIAL', dataPublicacao: new Date('2022-01-18'), descricao: 'DEC Nº 11', link: '/diario-oficial-visualizacao' },
    { edicao: 8, natureza: 'DOCUMENTO OFICIAL', dataPublicacao: new Date('2022-01-15'), descricao: 'DEC Nº 12', link: '/diario-oficial-visualizacao' },
    { edicao: 9, natureza: 'DOCUMENTO OFICIAL', dataPublicacao: new Date('2022-01-13'), descricao: 'DEC Nº 13', link: '/diario-oficial-visualizacao' },
    { edicao: 10, natureza: 'DOCUMENTO OFICIAL', dataPublicacao: new Date('2022-01-11'), descricao: 'DEC Nº 14', link: '/diario-oficial-visualizacao' },
    { edicao: 11, natureza: 'DOCUMENTO OFICIAL', dataPublicacao: new Date('2022-01-09'), descricao: 'DEC Nº 15', link: '/diario-oficial-visualizacao' },
    { edicao: 12, natureza: 'DOCUMENTO OFICIAL', dataPublicacao: new Date('2022-01-07'), descricao: 'DEC Nº 06', link: '/diario-oficial-visualizacao' },
    { edicao: 13, natureza: 'DOCUMENTO OFICIAL', dataPublicacao: new Date('2022-01-04'), descricao: 'PREGÃO PRESENCIAL 1', link: '/diario-oficial-visualizacao' },
    { edicao: 14, natureza: 'DOCUMENTO OFICIAL', dataPublicacao: new Date('2022-01-01'), descricao: 'PREGÃO PRESENCIAL 2', link: '/diario-oficial-visualizacao' }
  ];

  filteredDocuments: Document[] = this.documents;

  constructor(private fb: FormBuilder) {
    this.filterForm = this.fb.group({
      palavraChave: [''],
      periodoInicial: [''],
      periodoFinal: [''],
      fileUpload: ['']


    });
  }

  ngOnInit(): void {
    this.filterForm.get('documentName')?.valueChanges.subscribe(value => {
      this.filteredDocuments = this.documents.filter(doc => doc.descricao.toLowerCase().includes(value.toLowerCase()));
    });
  }
  onFormSubmit() {
    console.log(this.filterForm.value);
  }
}
