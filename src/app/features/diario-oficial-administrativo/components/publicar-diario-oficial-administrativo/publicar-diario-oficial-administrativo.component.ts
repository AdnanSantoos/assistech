import { Component, OnInit, TemplateRef } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { PublicarDiarioOficialService } from '../../services/publicar-diario-oficial.service';
import { CommonModule, Location } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { LogPipe } from '../../../../shared/pipes/log.pipe';
import { PublicarDiarioOficialMapper } from '../../mappers/publicar-diario-oficial-mapper';
import { BsModalRef, BsModalService, ModalModule } from 'ngx-bootstrap/modal';
import {
  BsDatepickerConfig,
  BsDatepickerModule,
  BsLocaleService,
} from 'ngx-bootstrap/datepicker';
import { defineLocale } from 'ngx-bootstrap/chronos';
import { ptBrLocale } from 'ngx-bootstrap/locale';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import {
  MAT_DATE_LOCALE,
  provideNativeDateAdapter,
} from '@angular/material/core';
import { TenantService } from '../../../../shared/services/tenant.service';

defineLocale('pt-br', ptBrLocale);

@Component({
  selector: 'app-publicar-diario-oficial-administrativo',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ModalModule,
    MatIconModule,
    MatButtonModule,
    LogPipe,
    BsDatepickerModule,
    MatCardModule,
    MatFormFieldModule,
    MatTableModule,
    MatDialogModule,
    MatDatepickerModule,
    MatInputModule,
    MatSelectModule,
  ],
  providers: [
    BsModalService,
    provideNativeDateAdapter(),
    { provide: MAT_DATE_LOCALE, useValue: 'pt-BR' },
  ],
  templateUrl: './publicar-diario-oficial-administrativo.component.html',
  styleUrls: ['./publicar-diario-oficial-administrativo.component.scss'],
})
export class PublicarDiarioOficialAdministrativoComponent implements OnInit {
  filtroForm: FormGroup;
  formAgendado: FormGroup;
  modalRef?: BsModalRef;
  nameFile: string | null = null;
  selectedFiles: File[] = [];
  selectedFilesMap: { [key: string]: File[] } = {};
  minDate: Date = new Date();
  bsConfig?: Partial<BsDatepickerConfig> = Object.assign(
    {},
    { containerClass: 'theme-default' }
  );
  isStaff!: boolean;
  isDragging = false;

  constructor(
    private _localeService: BsLocaleService,
    private fb: FormBuilder,
    private _modalService: BsModalService,
    private _publicarService: PublicarDiarioOficialService,
    private _location: Location,
    private _tenantService: TenantService
  ) {
    this._localeService.use('pt-br');

    // Inicialização do formulário principal com filesValidator customizado
    // Usamos um campo oculto "hasFiles" para rastrear se temos arquivos
    this.filtroForm = this.fb.group({
      date: [new Date(), Validators.required],
      description: ['', Validators.required],
      hasFiles: [false, Validators.requiredTrue],
      // Mantemos o campo files no formulário mas sem validator
      files: [null]
    });

    // Inicialização do formulário de agendamento
    this.formAgendado = this.fb.group({
      date: ['', Validators.required],
      description: ['', Validators.required],
      hasFiles: [false, Validators.requiredTrue],
      files: ['']
    });
    this.isStaff = this._tenantService.getStaff();

    this.bsConfig = {
      containerClass: 'theme-default',
      dateInputFormat: 'DD/MM/YYYY',
      adaptivePosition: true,
      showWeekNumbers: false,
    };

  }

  ngOnInit() {
  }

  goBack(): void {
    this._location.back();
  }

  onFormSubmit(event: any) {


    if (this.filtroForm.valid) {
      const formValue = this.filtroForm.getRawValue();

      // Formatando a data antes de enviar
      const formattedValue = {
        ...formValue,
        date: formValue.date
          ? new Date(
              new Date(formValue.date).getTime() -
                new Date().getTimezoneOffset() * 60000
            ).toISOString()
          : '',
        files: this.selectedFiles, // Usando a lista de arquivos selecionados
      };

      // Remover o campo hasFiles que é apenas para validação
      delete formattedValue.hasFiles;


      const formData = PublicarDiarioOficialMapper.toSubmit(formattedValue);
      this._publicarService.publicarDiarioOficial(formData);
    } else {
      Object.keys(this.filtroForm.controls).forEach(key => {
        const control = this.filtroForm.get(key);

      });
    }
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.isDragging = true;
  }

  onDragLeave(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.isDragging = false;
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.isDragging = false;

    const files = event.dataTransfer?.files;
    if (files && files.length > 0) {
      // Processar os arquivos diretamente
      this.processFiles(files);
    }
  }

  // Função para processar arquivos
  processFiles(files: FileList) {
    const validFiles: File[] = [];
    const invalidFiles: string[] = [];

    // Verificar cada arquivo
    for (let i = 0; i < files.length; i++) {
      const file = files[i];

      // Verificar se é PDF e não está duplicado
      if (file.type === 'application/pdf' &&
          !this.selectedFiles.some(f => f.name === file.name)) {
        validFiles.push(file);
      } else {
        invalidFiles.push(file.name);
      }
    }

    // Se tiver arquivos válidos, atualizamos a coleção
    if (validFiles.length > 0) {

      // Adicionar os novos arquivos à seleção existente
      this.selectedFiles = [...this.selectedFiles, ...validFiles];

      // Atualizar o nome dos arquivos para exibição
      this.nameFile = this.selectedFiles.map(file => file.name).join(', ');

      // Atualizar campo de validação (hasFiles) em ambos formulários
      this.filtroForm.get('hasFiles')?.setValue(true);
      this.formAgendado.get('hasFiles')?.setValue(true);

    }

    // Exibir alerta para arquivos inválidos
    if (invalidFiles.length > 0) {
      alert(`Os seguintes arquivos não são PDFs ou estão duplicados: ${invalidFiles.join(', ')}`);
    }
  }

  onFileChangeAgendado(event: any, fieldName: string) {
    const files = event.target.files;
    if (files && files.length > 0) {
      this.processFiles(files);
    } else {
      console.warn('onFileChangeAgendado: Nenhum arquivo recebido');
    }
  }

  onSubmitAgendado() {

    if (this.formAgendado.valid) {
      const formData = { ...this.formAgendado.getRawValue() };
      // Adicionar os arquivos manualmente ao objeto de dados
      formData.files = this.selectedFiles;
      // Remover campo de validação
      delete formData.hasFiles;

      Object.keys(formData).forEach((key) => {
        if (this.formAgendado.get(key)?.value instanceof Date) {
          formData[key] = this.formatDateToISOString(
            this.formAgendado.get(key)?.value
          );
        }
      });

      this._publicarService.publicarDiarioOficial(
        PublicarDiarioOficialMapper.toSubmit(formData)
      );
      this.closeModal();
    } else {
      console.warn('Formulário de agendamento inválido:', {
        formAgendadoValid: this.formAgendado.valid,
        hasFilesValid: this.formAgendado.get('hasFiles')?.valid,
        dateValid: this.formAgendado.get('date')?.valid,
        descriptionValid: this.formAgendado.get('description')?.valid
      });
    }
  }

  private formatDateToISOString(date: Date): string {
    if (!date) return '';

    // Cria uma nova data para evitar modificações no objeto original
    const safeDate = new Date(date);

    // Ajusta para o fuso horário local sem alterar a data
    return new Date(
      safeDate.getFullYear(),
      safeDate.getMonth(),
      safeDate.getDate()
    )
      .toISOString()
      .split('T')[0];
  }

  viewFile(event: Event, file: File) {
    event.preventDefault(); // Impede o submit do formulário
    event.stopPropagation(); // Impede propagação do evento
    const fileURL = URL.createObjectURL(file);
    const newWindow = window.open(fileURL, '_blank');

    if (newWindow) {
      const interval = setInterval(() => {
        if (newWindow.closed) {
          clearInterval(interval);
        }
      }, 500);
    }
  }

  removeFile(index: number) {
    this.selectedFiles.splice(index, 1);

    if (this.selectedFiles.length === 0) {
      this.nameFile = null;
      this.filtroForm.get('hasFiles')?.setValue(false);
      this.formAgendado.get('hasFiles')?.setValue(false);
    } else {
      this.nameFile = this.selectedFiles.map(file => file.name).join(', ');
    }
  }

  openModal(template: TemplateRef<void>) {
    this.modalRef = this._modalService.show(
      template,
      Object.assign({}, { class: 'modal-lg' })
    );
  }

  closeModal(): void {
    if (this.modalRef) {
      this.modalRef.hide();
      this.modalRef = undefined;
    }
  }
}
