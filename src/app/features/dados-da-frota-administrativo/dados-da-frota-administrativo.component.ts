import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { LayoutFormsAdmComponent } from '../../shared/containers/layout-forms-adm/layout-forms-adm.component';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-dados-da-frota-administrativo',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatIconModule,
    MatButtonModule,
    LayoutFormsAdmComponent
  ],
  templateUrl: './dados-da-frota-administrativo.component.html',
  styleUrls: ['./dados-da-frota-administrativo.component.scss']
})
export class DadosDaFrotaAdministrativoComponent {
  filtroForm: FormGroup;
  dynamicFields: any[];

  constructor(private fb: FormBuilder) {
    this.filtroForm = this.fb.group({
      ataDaSessao: [''],
      day: [''],
      month: [''],
      year: [''],
      file: [null]
    });

    this.dynamicFields = [
      { name: 'renavam', type: 'text', label: 'Renavam' },
      { name: 'dataAquisicao', type: 'text', label: 'Data da Aquisição' },
      { name: 'marcaModelo', type: 'text', label: 'Marca/Modelo' },
      { name: 'placa', type: 'text', label: 'Placa' },
      { name: 'chassi', type: 'text', label: 'Chassi' },
      { name: 'anoModelo', type: 'text', label: 'Ano Modelo' },
      { name: 'cor', type: 'text', label: 'Cor' },
      { name: 'veiculo', type: 'text', label: 'Veículo' },
      { name: 'setorUtilidade', type: 'text', label: 'Setor de Utilidade' },
      { name: 'origem', type: 'text', label: 'Origem' },
      { name: 'licenciamento', type: 'text', label: 'Licenciamento' },
      { name: 'quilometragem', type: 'text', label: 'Quilometragem' },
      { name: 'file', type: 'file', fileType: 'complex', label: '' }
    ];
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.filtroForm.patchValue({
        file: file
      });
    }
  }

  onFormSubmit() {
  }
}
