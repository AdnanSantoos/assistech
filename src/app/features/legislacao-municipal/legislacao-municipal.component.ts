import { Component} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LayoutTableComponent } from '../../shared/containers/layout-table/layout-table.component';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-legislacao-municipal',
  standalone: true,
  imports: [CommonModule,
    ReactiveFormsModule,
    MatIconModule,
    MatButtonModule,
    LayoutTableComponent],
  templateUrl: './legislacao-municipal.component.html',
  styleUrl: './legislacao-municipal.component.scss'
})
export class LegislacaoMunicipalComponent {
  filtroForm: FormGroup;
  displayedColumns: string[] = [];
  dataSource = [
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
