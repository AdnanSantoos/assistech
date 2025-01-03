import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { DiarioOficialLayoutComponent } from '../../containers/diario-oficial-layout/diario-oficial-layout.component';
import { MatIcon } from '@angular/material/icon';
import { DadosDiarioOficialPublico, DiarioOficalLista, DiarioOficialPesquisaData } from '../../models/diario-oficial.model';
import { RequisicaoModel, selectModel } from '../../../../shared/models/shared.model';
import { DiarioOficialService } from '../../services/diario-oficial.service';
import { NgSelectModule } from '@ng-select/ng-select';
import { BsModalRef, BsModalService, ModalModule } from 'ngx-bootstrap/modal';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';
import { DatePipe } from '@angular/common';
import { MatDatepicker, MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { DiarioOficialMapper } from '../../mappers/diario-oficial-mapper';
@Component({
  selector: 'app-diario-oficial-listagem',
  standalone: true,
  imports: [CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatIcon,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    RouterLink,
    MatButtonModule,
    NgSelectModule,
    ModalModule,
    NgxExtendedPdfViewerModule,
    BsDatepickerModule],
  templateUrl: './diario-oficial-listagem.component.html',
  styleUrl: './diario-oficial-listagem.component.scss',
  providers: [BsModalService, DatePipe]
})
export class DiarioOficialListagemComponent implements OnChanges {
  filterForm: FormGroup;
  resultados: RequisicaoModel<DiarioOficalLista[]>;
  anos: number[] = [2024];
  diarioData!: DadosDiarioOficialPublico;
  documentUrl!: string;
  documentTitulo!: string;
  meses: selectModel[] = [
    { key: "Janeiro", value: 1 },
    { key: "Fevereiro", value: 2 },
    { key: "Março", value: 3 },
    { key: "Abril", value: 4 },
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
  documentos: any;

  @Input() publicacoes!: RequisicaoModel<DadosDiarioOficialPublico> | null;
  @Output() formEmiter = new EventEmitter<DiarioOficialPesquisaData>;

  constructor(private modalService: BsModalService, private fb: FormBuilder, private router: Router, private diarioOficialService: DiarioOficialService) {
    this.filterForm = this.fb.group({
      year: [null],
      month: [null],
      number: [null],
      content: [null],
    });
    const navigation = this.router.getCurrentNavigation();
    this.resultados = navigation?.extras?.state?.['resultados'] || [];
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.documentos = this.publicacoes
  }

  limparFormulario(): void {
    this.filterForm.reset();
  }
  isAnoDesabilitado = (data: Date): boolean => {
    const ano = data.getFullYear();
    return this.anos.includes(ano);
  };

  selecionarAno = (anoNormalizado: Date, datepicker: MatDatepicker<Date>): void => {
    const ano = anoNormalizado.getFullYear();
    if (this.anos.includes(ano)) {
      this.filterForm.controls['year'].setValue(ano);
      datepicker.close();
    } else {
      console.error('Ano selecionado não é permitido.');
    }
  };

  algumCampoClicado(): boolean {
    return Object.values(this.filterForm.value).some(value => value !== null && value !== '');
  }

  aoMudarAno = (evento: any): void => {
    const anoSelecionado = new Date(evento.value).getFullYear();
    this.filterForm.patchValue({ year: anoSelecionado });
  };


  visualizar(template: TemplateRef<void>, url: string, titulo: string) {
    this.documentTitulo = titulo
    this.documentUrl = url;
    this.modalRef = this.modalService.show(template, Object.assign({}, { class: 'modal-lg' }));
  }

  buscarDiario() {
    let form = DiarioOficialMapper.toSearch(this.filterForm.value)
    this.formEmiter.emit(form)
  }

  initializeAnos(): void {
    if (this.diarioData) {
      this.anos = [this.diarioData.year];
    }
  }

  onAnoChange(selectedAno: number): void {
    // if (this.diarioData && this.diarioData.year === selectedAno) {
    //   this.meses = [this.diarioData.first_publication];
    // } else {
    //   this.meses = [];
    // }
  }
}
