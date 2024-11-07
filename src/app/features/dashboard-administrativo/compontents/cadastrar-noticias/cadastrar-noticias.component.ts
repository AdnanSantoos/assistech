import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NoticiasData } from '../../model/noticias.model'; // Interface do modelo

@Component({
  selector: 'app-cadastrar-noticias',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './cadastrar-noticias.component.html',
  styleUrl: './cadastrar-noticias.component.scss',
})
export class CadastrarNoticiasComponent {
  noticiaForm!: FormGroup;
  selectedFile!: File; // Para armazenar o arquivo selecionado

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.noticiaForm = this.fb.group({
      titulo: ['', Validators.required],
      data: ['', Validators.required],
      texto: ['', Validators.required],
      autor: ['', Validators.required],
      imagem: ['', Validators.required], // Form control para a imagem
    });
  }

  // Método para capturar o arquivo selecionado
  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      this.noticiaForm.patchValue({
        imagem: file.name, // Atualiza o nome do arquivo no formulário
      });
    }
  }

  onSubmit() {
    if (this.noticiaForm.valid) {
      const formData: NoticiasData = this.noticiaForm.value;

      // Adicionar lógica para upload do arquivo, se necessário
      console.log('Form Data:', formData);
      console.log('Selected Image File:', this.selectedFile);

      // Aqui vai a lógica para enviar os dados para o backend, incluindo o arquivo
    }
  }
}
