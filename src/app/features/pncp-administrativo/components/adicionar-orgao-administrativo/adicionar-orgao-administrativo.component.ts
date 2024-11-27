import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ToastrService } from 'ngx-toastr';
import { LayoutFormsAdmComponent } from '../../../../shared/containers/layout-forms-adm/layout-forms-adm.component';
import { OrgaosService } from '../../../dashboard-administrativo/compontents/orgao-administrativo/service/orgao-administrativos.service';
import { OrgaoMapper } from '../../../dashboard-administrativo/compontents/orgao-administrativo/mapper/orgao-administrativo.mapper';

@Component({
  selector: 'app-adicionar-orgao-administrativo',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatIconModule,
    MatButtonModule,
    LayoutFormsAdmComponent,
  ],
  templateUrl: './adicionar-orgao-administrativo.component.html',
  styleUrls: ['./adicionar-orgao-administrativo.component.scss'],
})
export class AdicionarOrgaoAdministrativoComponent implements OnInit {
  filtroForm: FormGroup;
  dynamicFields: { name: string; type: string; label: string; required: boolean }[] = [
    { name: 'country_register', type: 'text', label: 'CNPJ', required: true },
  ];

  constructor(
    private fb: FormBuilder,
    private orgaosService: OrgaosService,
    private toastr: ToastrService
  ) {
    this.filtroForm = this.fb.group({});
    this.initFormFields();
  }

  ngOnInit(): void {}

  initFormFields(): void {
    this.dynamicFields.forEach((field) => {
      this.filtroForm.addControl(
        field.name,
        this.fb.control('', field.required ? Validators.required : null)
      );
    });
  }

  onFormSubmit(event: any): void {
    if (this.filtroForm.valid) {
      const formData = OrgaoMapper.toSubmit(event);
      this.orgaosService.createOrgao(formData).subscribe({
        next: () => {
          this.toastr.success('Órgão criado com sucesso!', 'Sucesso');
          this.filtroForm.reset();
        },
        error: () => {
          this.toastr.error('Erro ao criar órgão. Tente novamente.', 'Erro');
        },
      });
    } else {
      this.toastr.warning('Preencha o campo obrigatório!', 'Atenção');
    }
  }
}
