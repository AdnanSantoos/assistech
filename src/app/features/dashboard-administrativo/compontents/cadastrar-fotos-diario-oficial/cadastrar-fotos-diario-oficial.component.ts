import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { HomeImage } from '../../model/home-image.model'; 
@Component({
  selector: 'app-cadastrar-fotos-diario-oficial',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './cadastrar-fotos-diario-oficial.component.html',
  styleUrls: ['./cadastrar-fotos-diario-oficial.component.scss']
})
export class CadastrarFotosDiarioOficialComponent {

  fotosForm!: FormGroup;
  selectedFile!: File;
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.fotosForm = this.fb.group({
      titulo: ['', Validators.required],
      imagem: ['', Validators.required],
    });
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      this.fotosForm.patchValue({
        imagem: file.name, 
      });
    }
  }

  onSubmit() {
    if (this.fotosForm.valid) {
      const formData: HomeImage = this.fotosForm.value;

      console.log('Form Data:', formData);
      console.log('Selected Image File:', this.selectedFile);

    }
  }

}
