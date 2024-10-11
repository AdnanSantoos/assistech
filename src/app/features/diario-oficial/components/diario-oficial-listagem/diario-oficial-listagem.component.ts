import { Component, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { DiarioOficialLayoutComponent } from '../../containers/diario-oficial-layout/diario-oficial-layout.component';
import { MatIcon } from '@angular/material/icon';
import { DadosDiarioOficialPublico, DiarioOficalLista } from '../../models/diario-oficial.model';
import { RequisicaoModel, selectModel } from '../../../../shared/models/shared.model';
import { DiarioOficialService } from '../../services/diario-oficial.service';
import { NgSelectModule } from '@ng-select/ng-select';
import { BsModalRef, BsModalService, ModalModule } from 'ngx-bootstrap/modal';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';
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
    NgSelectModule,
    ModalModule,
    NgxExtendedPdfViewerModule,
    DiarioOficialLayoutComponent],
  templateUrl: './diario-oficial-listagem.component.html',
  styleUrl: './diario-oficial-listagem.component.scss',
  providers:[BsModalService]
})
export class DiarioOficialListagemComponent {
  filterForm: FormGroup;
  resultados: RequisicaoModel<DiarioOficalLista[]>;
  filteredDocuments: DiarioOficalLista[]=[];
  anos: number[] = [];
  diarioData!: DadosDiarioOficialPublico[];
  documentUrl!:string;
  documentTitulo!:string;
  meses:selectModel[] = [
    { key: "Janeiro", value: 1 },
    { key: "Fevereiro", value: 2 },
    { key: "Março", value: 3 },
    { key: "Abril", value:4 },
    { key: "Maio", value: 5 },
    { key: "Junho", value: 6 },
    { key: "Julho", value: 7 },
    { key: "Agosto", value: 8 },
    { key: "Setembro", value: 9 },
    { key: "Outubro", value: 10 },
    { key: "Novembro", value: 11 },
    { key: "Dezembro", value: 12 }
  ]
  modalRef?: BsModalRef;

  constructor(private modalService: BsModalService,private fb: FormBuilder,private router: Router,private diarioOficialService: DiarioOficialService) {
    this.filterForm = this.fb.group({
      ano: [null],
      mes: [null],
      edicao: [null],
      palavraChave: [null],
      periodoInicial: [null],
      periodoFinal: [null],
      fileUpload: [null]
    });
    const navigation = this.router.getCurrentNavigation();
    this.resultados = navigation?.extras?.state?.['resultados'] || [];
  }

  openModal(template: TemplateRef<void>) {
    
  }
  ngOnInit(): void {
    this.diarioOficialService.getDiarioPublicoPorData().subscribe((data) => {
      this.filteredDocuments = data.data;
    });
  }
  visualizar(template: TemplateRef<void>,url:string,titulo:string){
    this.documentTitulo = titulo
    this.documentUrl = url;
    this.modalRef = this.modalService.show(template, Object.assign({}, { class: 'modal-lg' }));
  }
}
