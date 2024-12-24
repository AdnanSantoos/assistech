import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PublicarDiarioOficialService } from '../../services/publicar-diario-oficial.service';
import { CommonModule, Location } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { LayoutFormsAdmComponent } from '../../../../shared/containers/layout-forms-adm/layout-forms-adm.component';
import { LogPipe } from '../../../../shared/pipes/log.pipe';
import { PublicarDiarioOficialMapper } from '../../mappers/publicar-diario-oficial-mapper';
import { dynamicFields } from '../../../../shared/models/shared.model';
import { BsModalRef, BsModalService, ModalModule } from 'ngx-bootstrap/modal';
import { BsDatepickerConfig, BsDatepickerModule, BsLocaleService } from 'ngx-bootstrap/datepicker';
import { defineLocale } from 'ngx-bootstrap/chronos';
import { ptBrLocale } from 'ngx-bootstrap/locale';
defineLocale('pt-br', ptBrLocale);

@Component({
  selector: 'app-publicar-diario-oficial-administrativo',
  standalone: true,
  imports: [CommonModule,
    ReactiveFormsModule,
    ModalModule,
    MatIconModule,
    MatButtonModule,
    LogPipe,
    BsDatepickerModule,
    LayoutFormsAdmComponent],
  providers: [BsModalService],
  templateUrl: './publicar-diario-oficial-administrativo.component.html',
  styleUrls: ['./publicar-diario-oficial-administrativo.component.scss']
})
export class PublicarDiarioOficialAdministrativoComponent implements OnInit {
  filtroForm: FormGroup = this.fb.group({});
  formAgendado: FormGroup = this.fb.group({
    files: new FormControl(''),
    date: new FormControl(''),
    description: new FormControl(''),
  });
  modalRef?: BsModalRef;
  nameFile: string | null = null;
  selectedFiles: File[] = [];
  selectedFilesMap: { [key: string]: File[] } = {};
  minDate: Date = new Date()
  bsConfig?: Partial<BsDatepickerConfig> = Object.assign({}, { containerClass: 'theme-default' });
  dynamicFields: dynamicFields[] = [
    { name: 'date', type: 'date', label: 'Data', required: true, value: new Date(), disabled: true },
    { name: 'description', type: 'textarea', label: 'Descrição', required: true },
    { name: 'files', type: 'file', fileType: 'complex', label: 'Arquivo', required: true }
  ];

  constructor(
    private _localeService: BsLocaleService,
    private fb: FormBuilder,
    private _modalService: BsModalService,
    private _publicarService: PublicarDiarioOficialService
  ) {

    _localeService.use('pt-br');

    this.dynamicFields.forEach((field) => {
      const validators = field.required ? [Validators.required] : [];
      if (field.type === 'file') {
        this.filtroForm.addControl(field.name, this.fb.control(null, validators));
      } else if (field.type === 'checkbox') {
        this.filtroForm.addControl(field.name, this.fb.control(false, validators));
      } else if (field.type === 'date') {
        this.filtroForm.addControl(field.name, this.fb.control({ value: new Date(), disabled: true }, validators));
      }
      else {
        this.filtroForm.addControl(field.name, this.fb.control('teste', validators));
      }
    });
  }


  ngOnInit() { }

  onFormSubmit(event: any) {
    const formData = PublicarDiarioOficialMapper.toSubmit(event);
    this._publicarService.publicarDiarioOficial(formData);
  }

  onSubmitAgendado() {
    if (this.formAgendado.valid) {
      const formData = { ...this.formAgendado.getRawValue() };

      // Convertendo a data para o formato ISO
      Object.keys(formData).forEach((key) => {
        if (this.formAgendado.get(key)?.value instanceof Date) {
          formData[key] = this.formAgendado.get(key)?.value.toISOString();
        }
      });

      this._publicarService.publicarDiarioOficial(PublicarDiarioOficialMapper.toSubmit(formData));
    }
  }

  onFileChangeAgendado(event: any, fieldName: string) {
    const files = event.target.files;
    const validFiles: File[] = [];
    const invalidFiles: string[] = [];
  
    // Inicializa a lista caso ainda não exista
    if (!this.selectedFilesMap) {
      this.selectedFilesMap = {};
    }
    
    if (!this.selectedFilesMap[fieldName]) {
      this.selectedFilesMap[fieldName] = [];
    }
  
    if (files && files.length > 0) {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        // Verifica se o arquivo é PDF e não está duplicado
        if (
          file.type === 'application/pdf' &&
          !this.selectedFilesMap[fieldName].some(f => f.name === file.name)
        ) {
          validFiles.push(file);
        } else if (file.type !== 'application/pdf') {
          invalidFiles.push(file.name);
        } else {
          // Se o arquivo é PDF mas já está na lista, adiciona à lista de inválidos
          invalidFiles.push(file.name);
        }
      }
  
      // Adiciona arquivos válidos
      if (validFiles.length > 0) {
        this.selectedFilesMap[fieldName].push(...validFiles);
        this.selectedFiles = this.selectedFilesMap[fieldName]; // Atualiza a lista de arquivos selecionados
        this.nameFile = this.selectedFiles.map(file => file.name).join(', ');
        this.formAgendado.controls['files'].setValue(this.selectedFiles);
        this.formAgendado.get(fieldName)?.updateValueAndValidity();
      }
  
      // Alerta para arquivos inválidos
      if (invalidFiles.length > 0) {
        alert(`Os seguintes arquivos não são PDFs ou estão duplicados: ${invalidFiles.join(', ')}`);
      }
    }
  }


  viewFile(file: File) {
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
    }
  }

  openModal(template: TemplateRef<void>) {
    this.modalRef = this._modalService.show(template, Object.assign({}, { class: 'modal-lg' }));
  }
  closeModal(): void {
    if (this.modalRef) {
      this.modalRef.hide();
      this.modalRef = undefined; // Limpa a referência do modal
    }
  }
}
