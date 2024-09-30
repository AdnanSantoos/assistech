import { CommonModule, Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon'; // Alteração aqui: MatIconModule, não MatIcon

interface UnidadeData {
  numSeq: string;
  nome: string;
  cnpj: string;
  cdgIBGE: string;
  cdgUND: string;
}

const UNIDADES_DATA: UnidadeData[] = [
  { numSeq: '1', nome: 'CAMARA DE ITABERABA', cnpj: '123.456.890/0001-01', cdgIBGE: '2930709', cdgUND: '1201' },
  { numSeq: '2', nome: 'CAMARA DE ITABERABA', cnpj: '123.456.890/0001-01', cdgIBGE: '2930709', cdgUND: '1201' },
  { numSeq: '3', nome: 'CAMARA DE ITABERABA', cnpj: '123.456.890/0001-01', cdgIBGE: '2930709', cdgUND: '1201' },
  { numSeq: '4', nome: 'CAMARA DE ITABERABA', cnpj: '123.456.890/0001-01', cdgIBGE: '2930709', cdgUND: '1201' },
  { numSeq: '5', nome: 'CAMARA DE ITABERABA', cnpj: '123.456.890/0001-01', cdgIBGE: '2930709', cdgUND: '1201' },
  { numSeq: '6', nome: 'CAMARA DE ITABERABA', cnpj: '123.456.890/0001-01', cdgIBGE: '2930709', cdgUND: '1201' },
  { numSeq: '7', nome: 'CAMARA DE ITABERABA', cnpj: '123.456.890/0001-01', cdgIBGE: '2930709', cdgUND: '1201' },
  { numSeq: '8', nome: 'CAMARA DE ITABERABA', cnpj: '123.456.890/0001-01', cdgIBGE: '2930709', cdgUND: '1201' },
  { numSeq: '9', nome: 'CAMARA DE ITABERABA', cnpj: '123.456.890/0001-01', cdgIBGE: '2930709', cdgUND: '1201' },
];

@Component({
  selector: 'app-unidades-administrativo',
  standalone: true,
  imports: [RouterLink, CommonModule, MatIconModule], // Corrigido para MatIconModule
  templateUrl: './unidades-administrativo.component.html',
  styleUrls: ['./unidades-administrativo.component.scss'],
})
export class UnidadesAdministrativoComponent implements OnInit {
  displayedColumns: string[] = ['numSeq', 'nome', 'cnpj', 'cdgIBGE', 'cdgUND', 'acoes'];
  dataSource = new MatTableDataSource<UnidadeData>([]);
  pageSize = 10;
  currentPage = 1;
  totalPages = Math.ceil(UNIDADES_DATA.length / this.pageSize);

  constructor(private location: Location) {}

  ngOnInit() {
    this.updateTableData();
  }

  goBack(): void {
    this.location.back();
  }

  goToPage(pageNumber: number) {
    if (pageNumber >= 1 && pageNumber <= this.totalPages) {
      this.currentPage = pageNumber;
      this.updateTableData();
    }
  }

  goToPreviousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updateTableData();
    }
  }

  goToNextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updateTableData();
    }
  }

  updateTableData() {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = this.currentPage * this.pageSize;
    this.dataSource.data = UNIDADES_DATA.slice(startIndex, endIndex);
  }
}
