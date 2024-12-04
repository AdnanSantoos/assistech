import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { ToastrService } from 'ngx-toastr';

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
  constructor(private fb: FormBuilder, private _toastrService: ToastrService) { }

  ngOnInit(): void {
    this.fotosForm = this.fb.group({
      photo: ['', Validators.required],
    });
    this.logoForm = this.fb.group({
      logo: ['', Validators.required],
    });
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      this.fotosForm.patchValue({
        photo: file.name,
      });
    }
  }

  onSubmit() {
    if (this.fotosForm.valid && this.selectedFile) {
      const formData = new FormData();
      formData.append('photo', this.selectedFile);

    } else {
      console.error('Formulário inválido ou arquivo não selecionado.');
    }
  }

  onSubmitLogo() {
    if (this.logoForm.valid && this.selectedFile) {
      const logoForm = new FormData();
      logoForm.append('photo', this.selectedFile);

    } else {
      console.error('Formulário inválido ou arquivo não selecionado.');
    }
  }

  onLogoChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
      if (!allowedTypes.includes(file.type)) {
        this._toastrService.error('Apenas imagens nos formatos JPEG, PNG ou GIF são permitidas.', 'Erro');
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
}
