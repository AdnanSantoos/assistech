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

  constructor(
    private _localeService: BsLocaleService,
    private fb: FormBuilder,
    private _modalService: BsModalService,
    private _publicarService: PublicarDiarioOficialService,
    private _location: Location,
    private _tenantService: TenantService
  ) {
    this._localeService.use('pt-br');

    // Inicialização do formulário principal
    this.filtroForm = this.fb.group({
      date: [new Date(), Validators.required],
      description: ['', Validators.required],
      files: [null, Validators.required],
    });

    // Inicialização do formulário de agendamento
    this.formAgendado = this.fb.group({
      files: ['', Validators.required],
      date: ['', Validators.required],
      description: ['', Validators.required],
    });
    this.isStaff = this._tenantService.getStaff();

    this.bsConfig = {
      containerClass: 'theme-default',
      dateInputFormat: 'DD/MM/YYYY',
      adaptivePosition: true,
      showWeekNumbers: false,
    };
  }

  ngOnInit() {}
  goBack(): void {
    this._location.back();
  }
  onFormSubmit(event: any) {
    if (this.filtroForm.valid) {
      const formValue = this.filtroForm.getRawValue();

      // Formatando a data antes de enviar
      const formattedValue = {
        ...formValue,
        date: formValue.date ? new Date(new Date(formValue.date).getTime() - new Date().getTimezoneOffset() * 60000).toISOString() : '',
        files: this.selectedFiles, // Usando a lista de arquivos selecionados
      };

      const formData = PublicarDiarioOficialMapper.toSubmit(formattedValue);
      this._publicarService.publicarDiarioOficial(formData);
    }
  }

  onSubmitAgendado() {
    if (this.formAgendado.valid) {
      const formData = { ...this.formAgendado.getRawValue() };

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
  onFileChangeAgendado(event: any, fieldName: string) {
    const files = event.target.files;
    const validFiles: File[] = [];
    const invalidFiles: string[] = [];

    if (!this.selectedFilesMap) {
      this.selectedFilesMap = {};
    }

    if (!this.selectedFilesMap[fieldName]) {
      this.selectedFilesMap[fieldName] = [];
    }

    if (files && files.length > 0) {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        if (
          file.type === 'application/pdf' &&
          !this.selectedFilesMap[fieldName].some((f) => f.name === file.name)
        ) {
          validFiles.push(file);
        } else if (file.type !== 'application/pdf') {
          invalidFiles.push(file.name);
        } else {
          invalidFiles.push(file.name);
        }
      }

      if (validFiles.length > 0) {
        this.selectedFilesMap[fieldName].push(...validFiles);
        this.selectedFiles = this.selectedFilesMap[fieldName];
        this.nameFile = this.selectedFiles.map((file) => file.name).join(', ');
        this.formAgendado.controls['files'].setValue(this.selectedFiles);
        this.formAgendado.get(fieldName)?.updateValueAndValidity();
      }

      if (invalidFiles.length > 0) {
        alert(
          `Os seguintes arquivos não são PDFs ou estão duplicados: ${invalidFiles.join(
            ', '
          )}`
        );
      }
    }
  }

  viewFile(event: Event, file: File) {
    event.preventDefault(); // Impede o submit do formulário
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
      this.filtroForm.controls['files'].reset();
      this.formAgendado.controls['files'].reset();
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
