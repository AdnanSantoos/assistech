import { TenantService } from './../../../../shared/services/tenant.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule, Location } from '@angular/common';
import { NoticiaService } from './services/cadastrar-noticias.service';
import { ToastrService } from 'ngx-toastr';
import { NoticiaMapper } from './mapper/cadastrar-noticias-mapper';

@Component({
  selector: 'app-cadastrar-noticias',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './cadastrar-noticias.component.html',
  styleUrls: ['./cadastrar-noticias.component.scss'],
})
export class CadastrarNoticiasComponent implements OnInit {
  noticiaForm!: FormGroup;
  selectedFile: File | null = null;
  isSubmitting = false;
  slug!: string;

  constructor(
    private fb: FormBuilder,
    private _noticiaService: NoticiaService,
    private _tenantService: TenantService,
    private toastr: ToastrService,
    private _location: Location,

  ) {
    this._tenantService.state$.subscribe((tenantData) => {
      this.slug = tenantData?.slug!;
    });
  }

  ngOnInit(): void {
    this.noticiaForm = this.fb.group({
      tenant: [this.slug, Validators.required],
      title: ['', Validators.required],
      content: ['', Validators.required],
      author: ['', Validators.required],
      published_at: ['', Validators.required],
      image: ['', Validators.required],
    });
  }

  onFileChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      this.noticiaForm.patchValue({ image: file.name });
    }
  }

  goBack(): void {
    this._location.back();
  }
  onSubmit(): void {
    if (!this.noticiaForm.valid) {
      this.toastr.error('Por favor, preencha todos os campos obrigatórios.', 'Erro');
      return;
    }
  
    this.isSubmitting = true;
  
    const formData = NoticiaMapper.toFormData(this.noticiaForm.value);
  
    this._noticiaService.criarNoticia(formData).subscribe({
      next: () => {
        this.toastr.success('Notícia cadastrada com sucesso!', 'Sucesso');
        this.noticiaForm.reset();
        this.selectedFile = null;
      },
      error: (err) => {
        console.error('Erro ao cadastrar a notícia:', err);
        this.toastr.error('Erro ao cadastrar a notícia. Tente novamente.', 'Erro');
      },
      complete: () => {
        this.isSubmitting = false;
      },
    });
  }
  
}
