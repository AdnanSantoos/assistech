import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { ToastrService } from 'ngx-toastr';
import { CadastrarFotosAdministrativoService } from './services/cadastrar-foto-administrativo.service';

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
  selectedFile!: File;
  selectedImage: string | ArrayBuffer | null = null;
  logoFile: File | null = null;

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
  }

  onFileChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      this.fotosForm.patchValue({
        photo: file.name,
      });
    }
  }

  onLogoChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
      if (!allowedTypes.includes(file.type)) {
        this._toastrService.error(
          'Apenas imagens nos formatos JPEG, PNG ou GIF são permitidas.',
          'Erro'
        );
        this.logoFile = null;
        this.selectedImage = null;
        return;
      }
      this.logoFile = file;
      const reader = new FileReader();
      reader.onload = () => {
        this.selectedImage = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }

  onSubmit(tenant: string): void {
    if (this.fotosForm.valid && this.selectedFile) {
      const formData = new FormData();
      formData.append('photo', this.selectedFile);

      this._cadastrarFotosAdministrativoService.CadastrarFoto(tenant, formData).subscribe({
        next: (response) => {
          this._toastrService.success('Foto cadastrada com sucesso!', 'Sucesso');
          console.log('Foto cadastrada com sucesso:', response);
        },
        error: (err) => {
          this._toastrService.error('Erro ao cadastrar a foto!', 'Erro');
          console.error('Erro ao cadastrar a foto:', err);
        },
      });
    } else {
      this._toastrService.error('Formulário inválido ou arquivo não selecionado.', 'Erro');
      console.error('Formulário inválido ou arquivo não selecionado.');
    }
  }

  onSubmitLogo(): void {
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
      console.error('Formulário inválido ou arquivo não selecionado.');
    }
  }
  
}
