import { Component, Input, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { TableComponent } from '../../components/table/table.component';
import { FiltroGeralComponent } from '../../components/filtro-geral/filtro-geral.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-layout-table',
  standalone: true,
  imports: [
    TableComponent,
    FiltroGeralComponent,
    CommonModule
  ],
  templateUrl: './layout-table.component.html',
  styleUrl: './layout-table.component.scss'
})
export class LayoutTableComponent implements OnInit {
  @Input() titulo_pagina: string | null = null;
  @Input() displayedColumns: string[] = [];
  @Input() dataSource: any[] = [];
  @Input() filtro: any= null;
  
  filteredDataSource:any;
  ngOnInit(): void {
    this.filteredDataSource = this.dataSource;      
  }
}
