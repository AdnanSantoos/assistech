import { Component} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LayoutTableComponent } from '../../shared/containers/layout-table/layout-table.component';
import { MatButtonModule } from '@angular/material/button';
@Component({
  selector: 'app-patrimonios-publicos',
  standalone: true,
  imports: [CommonModule,
    ReactiveFormsModule,
    MatIconModule,
    MatButtonModule,
    LayoutTableComponent],
  templateUrl: './patrimonios-publicos.component.html',
  styleUrl: './patrimonios-publicos.component.scss'
})
export class PatrimoniosPublicosComponent {
  filtroForm: FormGroup;
  displayedColumns: string[] = ['titulo','orgao', 'observacao', 'arquivo'];
  dataSource = [
    { titulo: 'a', orgao:'CAM.ITABERABA', observacao: 'exerc.22', arquivo: 'link-to-arquivo-70' },
    { titulo: 'b', orgao:'CAM.ITABERABA', observacao: 'exerc.22', arquivo: 'link-to-arquivo-69' },
    { titulo: 'c', orgao:'CAM.ITABERABA', observacao: 'exerc.22', arquivo: 'link-to-arquivo-68' },
    { titulo: 'd', orgao:'CAM.ITABERABA', observacao: 'exerc.22', arquivo: 'link-to-arquivo-67' },
    { titulo: 'e', orgao:'CAM.ITABERABA', observacao: 'exerc.22', arquivo: 'link-to-arquivo-66' },
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
