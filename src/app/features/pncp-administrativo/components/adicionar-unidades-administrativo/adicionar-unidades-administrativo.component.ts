import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ToastrService } from 'ngx-toastr';
import { LayoutFormsAdmComponent } from '../../../../shared/containers/layout-forms-adm/layout-forms-adm.component';
import { UnidadesService } from '../../../dashboard-administrativo/compontents/unidades-administrativo/service/unidades-administrativos.service';
import { UnidadesMapper } from '../../../dashboard-administrativo/compontents/unidades-administrativo/mapper/unidades-administrativo.mapper';


@Component({
  selector: 'app-adicionar-unidades-administrativo',
  standalone: true,
  imports: [
    LayoutFormsAdmComponent,
    CommonModule,
    ReactiveFormsModule,
    MatIconModule,
    MatButtonModule,
  ],
  templateUrl: './adicionar-unidades-administrativo.component.html',
  styleUrls: ['./adicionar-unidades-administrativo.component.scss'],
})
export class AdicionarUnidadesAdministrativoComponent {
  filtroForm: FormGroup;
  dynamicFields: { name: string; type: string; label: string; placeholder?: string; required?: boolean }[];

  constructor(
    private fb: FormBuilder,
    private unidadesService: UnidadesService,
    private toastr: ToastrService
  ) {
    this.filtroForm = this.fb.group({
      agency: ['', [Validators.required]],
      agency_country_register: ['', [Validators.required]],
    });

    this.dynamicFields = [
      { name: 'agency', type: 'text', label: 'Órgão', placeholder: 'Digite o órgão', required: true },
      { name: 'agency_country_register', type: 'text', label: 'CNPJ', placeholder: 'Digite o CNPJ', required: true },
    ];
  }

  onFormSubmit(event: any): void {
    if (this.filtroForm.valid) {
      const formData = UnidadesMapper.toSubmit(event);
      this.unidadesService.createUnidade(formData).subscribe({
        next: () => {
          this.toastr.success('Unidade criada com sucesso!', 'Sucesso');
          this.filtroForm.reset();
        },
        error: () => {
          this.toastr.error('Erro ao criar unidade. Tente novamente.', 'Erro');
        },
      });
    } else {
      this.toastr.warning('Preencha todos os campos obrigatórios!', 'Atenção');
    }
  }
}
