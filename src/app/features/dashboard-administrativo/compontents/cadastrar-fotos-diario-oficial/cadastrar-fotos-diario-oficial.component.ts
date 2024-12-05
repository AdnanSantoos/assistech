import { TabsModule } from 'ngx-bootstrap/tabs';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CadastrarFotosAdministrativoService } from './services/cadastrar-foto-administrativo.service';
import { CommonModule } from '@angular/common';

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
  selectedFiles: File[] = [];
  selectedImages: (string | ArrayBuffer | null)[] = [];
  logoFile: File | null = null;
  selectedLogo: string | ArrayBuffer | null = null;

  constructor(
    private fb: FormBuilder,
    private _toastrService: ToastrService,
    private _cadastrarFotosAdministrativoService: CadastrarFotosAdministrativoService
  ) { }

  ngOnInit(): void {
    this.fotosForm = this.fb.group({
      photo: ['', Validators.required],
    });

    this.logoForm = this.fb.group({
      logo: ['', Validators.required],
    });
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
      this.fotosForm.patchValue({ photo: 'Arquivos selecionados' });
    } else {
      this.fotosForm.patchValue({ photo: null });
    }
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
    this.logoForm.patchValue({ photo: 'Arquivos selecionados' });
  }


  onSubmit(): void {
    if (this.fotosForm.valid && this.selectedFiles.length > 0) {
      const formData = new FormData();
      this.selectedFiles.forEach((file) => {
        formData.append('photos[]', file);
      });

      this._cadastrarFotosAdministrativoService.CadastrarFoto(formData).subscribe({
        next: (response) => {
          this._toastrService.success('Fotos cadastradas com sucesso!', 'Sucesso');
          console.log('Fotos cadastradas com sucesso:', response);
        },
        error: (err) => {
          this._toastrService.error('Erro ao cadastrar as fotos!', 'Erro');
          console.error('Erro ao cadastrar as fotos:', err);
        },
      });
    } else {
      this._toastrService.error('Formulário inválido ou arquivos não selecionados.', 'Erro');
    }
  }

  onSubmitLogo(): void {
    console.log('aqui')
    if (this.logoForm.valid && this.logoFile) {
      const formData = new FormData();
      formData.append('file', this.logoFile);

      this._cadastrarFotosAdministrativoService.uploadLogo(formData).subscribe({
        next: () => {
          this._toastrService.success('Logotipo enviado com sucesso!', 'Sucesso');
          console.log('Logotipo enviado com sucesso.');
        },
        error: (err) => {
          this._toastrService.error('Erro ao enviar o logotipo!', 'Erro');
          console.error('Erro ao enviar o logotipo:', err);
        },
      });
    } else {
      this._toastrService.error('Formulário inválido ou arquivo não selecionado.', 'Erro');
    }
  }
}