import { TabsModule } from 'ngx-bootstrap/tabs';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CadastrarFotosAdministrativoService } from './services/cadastrar-foto-administrativo.service';
import { CommonModule } from '@angular/common';
import { PhotoMapper } from './mapper/cadastrar-foto.mapper';

@Component({
  selector: 'app-cadastrar-fotos-diario-oficial',
  standalone: true,
  imports: [ReactiveFormsModule, TabsModule, CommonModule],
  templateUrl: './cadastrar-fotos-diario-oficial.component.html',
  styleUrls: ['./cadastrar-fotos-diario-oficial.component.scss'],
})
export class CadastrarFotosDiarioOficialComponent implements OnInit {
  fotosForm!: FormGroup;
  logoForm!: FormGroup;
  logoFormDiario!: FormGroup;
  selectedFiles: File[] = [];
  selectedImages: (string | ArrayBuffer | null)[] = [];
  logoFile: File | null = null;
  selectedLogo: string | ArrayBuffer | null = null;

  logoFileDiario: File | null = null;
  selectedLogoDiario: string | ArrayBuffer | null = null;

  constructor(
    private fb: FormBuilder,
    private _toastrService: ToastrService,
    private _cadastrarFotosAdministrativoService: CadastrarFotosAdministrativoService
  ) {}

  ngOnInit(): void {
    this.fotosForm = this.fb.group({
      photo: ['', Validators.required],
    });

    this.logoForm = this.fb.group({
      logo: ['', Validators.required],
    });
    this.logoFormDiario = this.fb.group({
      logo: ['', Validators.required],
    });
  }

  onFileLogoChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (!input.files) {
      return;
    }

    const file: File = input.files[0];
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];

    if (!allowedTypes.includes(file.type)) {
      this._toastrService.error(
        'Apenas imagens nos formatos JPEG, PNG ou GIF são permitidas.',
        'Erro'
      );
      this.logoFile = null;
      this.logoForm.patchValue({ logo: null });
      this.selectedLogo = null;
      return;
    }

    this.logoFile = file;

    const reader = new FileReader();
    reader.onload = () => {
      this.selectedLogo = reader.result;
    };
    reader.readAsDataURL(file);
    this.logoForm.patchValue({ logo: 'Arquivos selecionados' });
  }


  onFileLogoDiarioChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (!input.files) {
      return;
    }

    const file: File = input.files[0];
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];

    if (!allowedTypes.includes(file.type)) {
      this._toastrService.error(
        'Apenas imagens nos formatos JPEG, PNG ou GIF são permitidas.',
        'Erro'
      );
      this.logoFileDiario = null;
      this.logoFormDiario.patchValue({ logo: null });
      this.selectedLogoDiario = null;
      return;
    }

    this.logoFileDiario = file;

    const reader = new FileReader();
    reader.onload = () => {
      this.selectedLogoDiario = reader.result;
    };
    reader.readAsDataURL(file);
    this.logoFormDiario.patchValue({ logo: 'Arquivos selecionados' });
  }
  onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (!input.files) {
      return;
    }

    const files: File[] = Array.from(input.files);
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];

    this.selectedFiles = [];
    this.selectedImages = [];

    for (const file of files) {
      if (!allowedTypes.includes(file.type)) {
        this._toastrService.error(
          'Apenas imagens nos formatos JPEG, PNG ou GIF são permitidas.',
          'Erro'
        );
        continue;
      }
      this.selectedFiles.push(file);

      const reader = new FileReader();
      reader.onload = () => {
        this.selectedImages.push(reader.result);
      };
      reader.readAsDataURL(file);
    }

    if (this.selectedFiles.length > 0) {
      this.fotosForm.patchValue({ photo: this.selectedFiles[0] });
    } else {
      this.fotosForm.patchValue({ photo: null });
    }
  }

  onSubmit(): void {
    if (this.fotosForm.valid && this.selectedFiles.length > 0) {
      const file = this.selectedFiles[0];
      const formData = PhotoMapper.toFormData(file);

      this._cadastrarFotosAdministrativoService
        .CadastrarFoto(formData)
        .subscribe({
          next: (response) => {
            console.log('Foto cadastrada com sucesso:', response);
          },
          error: (err) => {
            console.error('Erro ao cadastrar a foto:', err);
          },
        });
    } else {
      console.error('Formulário inválido ou arquivo não selecionado.');
    }
  }

  onSubmitLogo(): void {
    if (this.logoFormDiario.valid && this.logoFile) {
      const formData = new FormData();
      formData.append('logo', this.logoFile);

      this._cadastrarFotosAdministrativoService.uploadLogo(formData).subscribe({
        next: () => {
          this._toastrService.success(
            'Logotipo enviado com sucesso!',
            'Sucesso'
          );
          console.log('Logotipo enviado com sucesso.');
        },
        error: (err) => {
          this._toastrService.error('Erro ao enviar o logotipo!', 'Erro');
          console.error('Erro ao enviar o logotipo:', err);
        },
      });
    } else {
      this._toastrService.error(
        'Formulário inválido ou arquivo não selecionado.',
        'Erro'
      );
    }
  }

  onSubmitLogoDiario(): void {
    if (this.logoFormDiario.valid && this.logoFileDiario) {
      const formData = new FormData();
      formData.append('logo', this.logoFileDiario);

      this._cadastrarFotosAdministrativoService.uploadLogoDiario(formData).subscribe({
        next: () => {
          this._toastrService.success(
            'Logotipo enviado com sucesso!',
            'Sucesso'
          );
        }
      });
    } else {
      this._toastrService.error(
        'Formulário inválido ou arquivo não selecionado.',
        'Erro'
      );
    }
  }
}
