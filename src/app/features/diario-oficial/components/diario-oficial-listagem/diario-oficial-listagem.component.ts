import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { DiarioOficialLayoutComponent } from '../../containers/diario-oficial-layout/diario-oficial-layout.component';
import { MatIcon } from '@angular/material/icon';
import { DiarioOficalLista } from '../../models/diario-oficial.model';
import { RequisicaoModel } from '../../../../shared/models/shared.model';
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
  resultados: RequisicaoModel<DiarioOficalLista[]>;
  filteredDocuments: DiarioOficalLista[]=[];
  constructor(private fb: FormBuilder,private router: Router) {
    this.filterForm = this.fb.group({
      palavraChave: [''],
      periodoInicial: [''],
      periodoFinal: [''],
      fileUpload: ['']
    });
    const navigation = this.router.getCurrentNavigation();
    this.resultados = navigation?.extras?.state?.['resultados'] || [];
    this.filteredDocuments = this.resultados.data;
  }

  ngOnInit(): void {
    this.filterForm.get('palavraChave')?.valueChanges.subscribe(value => {
      this.filteredDocuments = this.resultados.data.filter(doc => doc.description.toLowerCase().includes(value.toLowerCase()));
    });
  }
  onFormSubmit() {
  }

  visualizar(url:string){
    this.router.navigate(['/diario-oficial/visualizar'], { state: { url: url } });
  }
}
