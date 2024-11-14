import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NoticiaService } from './services/cadastrar-noticias.service';
import { Noticia } from './models/cadastrar-noticias.model';

@Component({
  selector: 'app-cadastrar-noticias',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './cadastrar-noticias.component.html',
  styleUrls: ['./cadastrar-noticias.component.scss'],
})
export class CadastrarNoticiasComponent implements OnInit {
  noticiaForm!: FormGroup;
  selectedFile!: File | null;
  isSubmitting = false;

  constructor(private fb: FormBuilder, private noticiaService: NoticiaService) { }

  ngOnInit(): void {
    this.noticiaForm = this.fb.group({
      titulo: ['', Validators.required],
      dataPublicacao: ['', Validators.required],
      content: ['', Validators.required],
      author: ['', Validators.required],
      image: ['', Validators.required],
    });
  }

  onFileChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      this.noticiaForm.patchValue({
        image: file.name, 
      });
    }
  }

  onSubmit(): void {
    if (this.noticiaForm.valid) {
      this.isSubmitting = true;
  
      const noticiaData: Noticia = {
        ...this.noticiaForm.value,
        published_at: this.noticiaForm.value.dataPublicacao,
      };
  
      this.noticiaService.criarNoticia(noticiaData).subscribe({
        next: (response) => {
          console.log('Notícia criada com sucesso:', response);
          alert('Notícia cadastrada com sucesso!');
          this.noticiaForm.reset();
        },
        error: (err) => {
          console.error('Erro ao cadastrar a notícia:', err);
          alert('Erro ao cadastrar a notícia. Tente novamente.');
        },
        complete: () => {
          this.isSubmitting = false;
        },
      });
    } else {
      alert('Por favor, preencha todos os campos obrigatórios.');
    }
  }
  
}
