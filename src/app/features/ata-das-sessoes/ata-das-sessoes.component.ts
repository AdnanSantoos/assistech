import { Component } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { ReactiveFormsModule } from '@angular/forms';
import { TableComponent } from '../../shared/components/table/table.component';
import { FiltroGeralComponent } from '../../shared/components/filtro-geral/filtro-geral.component';
import { MatNativeDateModule } from '@angular/material/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ata-das-sessoes',
  standalone: true,
  imports: [
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    TableComponent,
    FiltroGeralComponent,
    CommonModule
  ],
  templateUrl: './ata-das-sessoes.component.html',
  styleUrls: ['./ata-das-sessoes.component.scss']
})
export class AtaDasSessoesComponent {
  displayedColumns: string[] = ['ata', 'data', 'download'];
  dataSource = [
    { ata: '70/2023', data: '14/11/2023', download: 'link-to-download-70' },
    { ata: '69/2023', data: '14/11/2023', download: 'link-to-download-69' },
    { ata: '68/2023', data: '14/11/2023', download: 'link-to-download-68' },
    { ata: '67/2023', data: '14/11/2023', download: 'link-to-download-67' },
    { ata: '66/2023', data: '14/11/2023', download: 'link-to-download-66' },
  ];

  filteredDataSource = this.dataSource;

  onFiltroChange(filtro: any) {
    const filterDate = `${filtro.day}/${filtro.month}/${filtro.year}`;
    this.filteredDataSource = this.dataSource.filter(item => {
      const matchAta = item.ata.includes(filtro.ataDaSessao);
      const matchDate = item.data.includes(filterDate);
      return matchAta && matchDate;
    });
  }
}
