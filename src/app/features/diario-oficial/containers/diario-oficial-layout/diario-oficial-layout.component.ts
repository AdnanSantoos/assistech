import { DadosDiarioOficialPublico } from './../../models/diario-oficial.model';
import { DiarioOficialListagemComponent } from './../../components/diario-oficial-listagem/diario-oficial-listagem.component';
import { Component, EventEmitter, OnInit, Output, output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { DiarioOficialService } from '../../services/diario-oficial.service';
import { DadosDiarioOficialPublico, DiarioOficialPesquisaData } from '../../models/diario-oficial.model';
import { Location } from '@angular/common';
import { Observable } from 'rxjs';
import { RequisicaoModel } from '../../../../shared/models/shared.model';

@Component({
  selector: 'app-diario-oficial-layout',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    RouterLink,
    MatButtonModule,
    RouterModule,
    DiarioOficialListagemComponent
],
  templateUrl: './diario-oficial-layout.component.html',
  styleUrls: ['./diario-oficial-layout.component.scss']
})
export class DiarioOficialLayoutComponent implements OnInit {
  filtroForm: DiarioOficialPesquisaData = {
    content:null,
    year:null,
    number:null,
    month:null,
  };
  anos: number[] = [];
  meses: string[] = [];
  diarioData: DadosDiarioOficialPublico | undefined;
  exibirFormulario: boolean = false;

  get publicacoesDiario$(): Observable<RequisicaoModel<DadosDiarioOficialPublico> | null>{
    return this._service.publicacoesDiario$
  }

  constructor(
    private fb: FormBuilder,
    private _service: DiarioOficialService,
    private location: Location
  ) {
  }

  ngOnInit(): void {
    this._service.getDiarioPublicoEntidade().subscribe((res:DadosDiarioOficialPublico)=>{
      this.gerarAnosAteAtual(res.year)
      this._service.getDiarioPublicoPorFiltro(this.filtroForm)
    })
  }

  getForm(value:DiarioOficialPesquisaData){
    this.filtroForm = value;
    this._service.getDiarioPublicoPorFiltro(this.filtroForm)
  }


  initializeAnos(): void {
    if (this.diarioData) {
      this.anos = [this.diarioData.year];
    }
  }

  onAnoChange(selectedAno: number): void {
    if (this.diarioData && this.diarioData.year === selectedAno) {
      this.meses = [this.diarioData.first_publication];
    } else {
      this.meses = [];
    }
  }

  gerarAnosAteAtual(anoInicial: number) {
    const anoAtual = new Date().getFullYear();
    let anos = [];
    for (let ano = anoInicial; ano <= anoAtual; ano++) {
      anos.push(ano);
    }
    return anos;
  }

  onFormSubmit(): void {
  }

  goBack(): void {
    this.location.back();
  }
}
