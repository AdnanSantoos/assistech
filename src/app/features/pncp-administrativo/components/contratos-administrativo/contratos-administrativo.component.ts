import { SidebarAdministrativoComponent } from './../../../../shared/components/sidebar-administrativo/sidebar-administrativo.component';
import { NavbarComponent } from './../../../../shared/components/navbar/navbar.component';
import { Component, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { LayoutFormsAdmComponent } from '../../../../shared/containers/layout-forms-adm/layout-forms-adm.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { LicitacoesService } from '../../../dashboard-administrativo/compontents/lista-licitacao-administrativo/service/licitacoes-administrativos.service';
import { LicitacaoModel } from '../../../dashboard-administrativo/compontents/lista-licitacao-administrativo/model/licitacoes-administrativo.model';

@Component({
  selector: 'app-contratos-administrativo',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatIconModule,
    MatButtonModule,
    NavbarComponent,
    FormsModule,
    SidebarAdministrativoComponent
  ],
  providers: [BsModalService],
  templateUrl: './contratos-administrativo.component.html',
  styleUrls: ['./contratos-administrativo.component.scss'],
})


export class ContratosAdministrativoComponent {
  filtroForm: FormGroup;
  contratoForm: FormGroup;
  modalRef?: BsModalRef;
  selectedItem: any = null;
  licitacoes!: LicitacaoModel[];

  constructor(private fb: FormBuilder, private modalService: BsModalService, private _licitacaoService: LicitacoesService) {
    this.filtroForm = this.fb.group({
      ataDaSessao: [''],
      day: [''],
      month: [''],
      year: [''],
      file: [null],
    });

    this.contratoForm = this.fb.group({
      selecioneLista: [''],
      receitaDespesa: [''],
      tipoContrato: [''],
      categoriaProcesso: [''],
      numContrato: [''],
      anoContrato: [''],
      numProcesso: [''],
      tipoPessoa: [''],
      numCNPJCPF: [''],
      nomerazao: [''],
      valorInicialContrato: [''],
      valParcela: [''],
      valGlobContrato: [''],
      valAcumuladoContrato: [''],
      tipoFornecedor: [''],
      numCNPJFornecSubcontratado: [''],
      nomeFornecedorSub: [''],
      identificadorContrato: [''],
      urfInformacoesContrato: [''],
      dataAssinatura: [''],
      dataAssinaturaContrato: [''],
      dataFinalVigencia: ['']
    });
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.filtroForm.patchValue({
        file: file,
      });
    }
  }

  onSubmit(): void {
    console.log(this.contratoForm.value);
  }

  openModal(template: TemplateRef<void>) {
    this.modalRef = this.modalService.show(template, Object.assign({}, { class: 'modal-lg modal-licitacoes' }));
    this._licitacaoService.getLicitacoes(1).subscribe({
      next: (response) => {
        this.licitacoes = response.data
      },
      error: (err) => {
        console.error('Erro ao carregar licitações:', err);
      },
    });
  }

  onSelecionarItem(item: any): void {
    this.selectedItem = item;
    console.log('Item selecionado:', this.selectedItem);
    this.modalRef?.hide();
  }
}
