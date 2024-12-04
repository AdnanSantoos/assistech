import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-cadastrar-fotos-diario-oficial',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './cadastrar-fotos-diario-oficial.component.html',
  styleUrls: ['./cadastrar-fotos-diario-oficial.component.scss'],
})
export class CadastrarFotosDiarioOficialComponent implements OnInit {
  fotosForm!: FormGroup;
  selectedFile!: File;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.fotosForm = this.fb.group({
      photo: ['', Validators.required],
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
}
