import { CommonModule, Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatIcon, MatIconModule } from '@angular/material/icon'; // Certifique-se de importar corretamente MatIconModule

interface OrgaoData {
  numSeq: string;
  nome: string;
  cnpj: string;
  cdgIBGE: string;
  cdgORG: string;
}

const ORGAOS_DATA: OrgaoData[] = [
  {
    numSeq: '1',
    nome: 'ORGÃO 1',
    cnpj: '123.456.890/0001-01',
    cdgIBGE: '2930709',
    cdgORG: 'O101',
  },
  {
    numSeq: '2',
    nome: 'ORGÃO 2',
    cnpj: '123.456.890/0001-01',
    cdgIBGE: '2930709',
    cdgORG: 'O102',
  },
  {
    numSeq: '3',
    nome: 'ORGÃO 3',
    cnpj: '123.456.890/0001-01',
    cdgIBGE: '2930709',
    cdgORG: 'O103',
  },
  {
    numSeq: '4',
    nome: 'ORGÃO 4',
    cnpj: '123.456.890/0001-01',
    cdgIBGE: '2930709',
    cdgORG: 'O104',
  },
  {
    numSeq: '5',
    nome: 'ORGÃO 5',
    cnpj: '123.456.890/0001-01',
    cdgIBGE: '2930709',
    cdgORG: 'O105',
  },
];

@Component({
  selector: 'app-orgao-administrativo',
  standalone: true,
  imports: [RouterLink, CommonModule, MatIcon],
  templateUrl: './orgao-administrativo.component.html',
  styleUrls: ['./orgao-administrativo.component.scss'],
})
export class OrgaoAdministrativoComponent implements OnInit {
  displayedColumns: string[] = [
    'numSeq',
    'nome',
    'cnpj',
    'cdgIBGE',
    'cdgORG',
    'acoes',
  ];
  dataSource = new MatTableDataSource<OrgaoData>([]);
  pageSize = 10;
  currentPage = 1;
  totalPages = Math.ceil(ORGAOS_DATA.length / this.pageSize);

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
    this.dataSource.data = ORGAOS_DATA.slice(startIndex, endIndex);
  }
}
