import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ClienteAdministrativoService } from '../cliente-administrativo/services/cliente-administrativo.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, debounceTime, of, switchMap } from 'rxjs';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';
import { ClienteData } from '../../model/cliente.model';

@Component({
  selector: 'app-cadastrar-cliente-administrativo',
  templateUrl: './cadastrar-cliente-administrativo.component.html',
  imports: [CommonModule, ReactiveFormsModule, TypeaheadModule],
  standalone: true,
  styleUrls: ['./cadastrar-cliente-administrativo.component.scss'],
})
export class CadastrarClienteAdministrativoComponent implements OnInit {
  clienteForm!: FormGroup;
  cidadeOptions: any[] = [];
  isLoading = false;
  isEditMode = false;
  slug: string | null = null;
  formularioOriginal!: ClienteData[];
  isLoadingButton = false;
  originalCliente!: ClienteData;

  constructor(
    private fb: FormBuilder,
    private _clienteService: ClienteAdministrativoService,
    private _toastrService: ToastrService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.clienteForm = this.fb.group({
      city: this.fb.group({
        code: ['', Validators.required],
        label: ['', Validators.required],
      }),
      government_body: ['', Validators.required],
      name: ['', Validators.required],
      pncp: [false],
      portal_transparencia: [false],
      diario_oficial: [false],
      beginning_official_gazette: [0, Validators.required],
      slug: ['', Validators.required],
      is_active: [true],
      domain: [''],
      city_code: ['', Validators.required],
      next_edition_number: [0, Validators.required],
      file_is_sent_signed: [false],
      errors: [null],
    });
    this.route.paramMap.subscribe((params) => {
      this.slug = params.get('slug');
      if (this.slug) {
        this.isEditMode = true;
        this._clienteService.getClienteBySlug(this.slug).subscribe((v) => {
          this.originalCliente = v.data; // Inicializando originalCliente
          this.formularioOriginal = v.data;
          this.populaFormulario(v.data);
        });
      }
    });

    this.setupCidadeAutoComplete();
  }

  populaFormulario(clienteData: any): void {
    this.clienteForm.patchValue({
      agencies: clienteData.agencies || [],
      city: {
        code: clienteData.city?.code || '',
        label: clienteData.city?.label || '',
      },
      government_body: clienteData.government_body || '',
      city_name: clienteData.city_name || '',
      name: clienteData.name || '',
      pncp: clienteData.pncp || false,
      portal_transparencia: clienteData.portal_transparencia || false,
      diario_oficial: clienteData.diario_oficial || false,
      beginning_official_gazette: clienteData.year || '',
      slug: clienteData.slug || '',
      state_uf: clienteData.state_uf || '',
      domain: clienteData.domain || '',
      city_code: clienteData.city_code || '',
      next_edition_number: clienteData.next_edition_number || '',
      file_is_sent_signed: clienteData.file_is_sent_signed || false,
      errors:clienteData.errors || null
    });
  }

  private setupCidadeAutoComplete(): void {
    this.clienteForm
      .get('city.label')
      ?.valueChanges.pipe(
        debounceTime(300),
        switchMap((label: string) => {
          if (!label.trim()) return of([]);
          this.isLoading = true;
          return this._clienteService.searchCities(label).pipe(
            catchError(() => {
              this._toastrService.error('Erro ao carregar cidades', 'Erro');
              return of([]);
            })
          );
        })
      )
      .subscribe({
        next: (response: any) => {
          this.cidadeOptions = response?.data || [];
          this.isLoading = false;
        },
        error: () => {
          this.isLoading = false;
          this.cidadeOptions = [];
        },
      });
  }

  onCidadeSelect(event: any): void {
    const cidadeSelecionada = event.item;

    if (!cidadeSelecionada) {
      this._toastrService.warning('Selecione uma cidade válida', 'Atenção');
      return;
    }

    const cityName = cidadeSelecionada.label;
    const slug = this.generateSlug(cityName);

    this.clienteForm.patchValue({
      city: {
        label: cidadeSelecionada.label,
        code: cidadeSelecionada.code,
        state_code: cidadeSelecionada.state_code || '',
        uf: cidadeSelecionada.uf || '',
      },
      city_code: cidadeSelecionada.code,
      slug,
    });
  }

  private generateSlug(cityName: string): string {
    const [fullName, stateCode] = cityName.split(' - ');

    const normalizedCity = fullName
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/ç/g, 'c')
      .replace(/[^a-zA-Z0-9\s]/g, '')
      .trim();

    const cityParts = normalizedCity.split(' ');

    const mainPart =
      cityParts.length > 1 ? cityParts[cityParts.length - 1] : normalizedCity;

    return (mainPart + (stateCode || '')).toLowerCase();
  }

  onSubmit(): void {
    this.isLoadingButton = true;
    if (this.clienteForm.valid) {
      const clienteData = this.clienteForm.value;

      if (this.isEditMode) {
        this.updateCliente(clienteData);
      } else {
        this.createCliente(clienteData);
      }
    } else {
      this._toastrService.error(
        'Preencha todos os campos obrigatórios.',
        'Erro'
      );
    }
  }

  private createCliente(clienteData: any): void {
    this._clienteService.createUser(clienteData).subscribe({
      next: () => {
        this.clienteForm.reset();
        this.router.navigate(['/adm/dashboard-administrativo/cliente']);
        this.isLoadingButton = false;
      },
      error: (err) => {
        this._toastrService.error(
          err?.error?.message || 'Erro ao criar cliente.',
          'Erro'
        );
        this.isLoadingButton = false;
      },
    });
  }

  private updateCliente(formValue: any): void {
    const changedFields = this.getChangedFields(formValue);
    if (Object.keys(changedFields).length === 0) {
      this._toastrService.info('Nenhuma alteração detectada.', 'Informação');
      return;
    }

    this.isLoadingButton = true;
    this._clienteService
      .updateCliente(formValue.slug, changedFields)
      .subscribe({
        next: () => {
          this._toastrService.success(
            'Cliente atualizado com sucesso!',
            'Sucesso'
          );
          this.isLoadingButton = false;
        },
        error: (err) => {
          this._toastrService.error(
            err?.error?.message || 'Erro ao atualizar cliente.',
            'Erro'
          );
          this.isLoadingButton = false;
        },
      });
  }

  private getChangedFields(
    formValue: Partial<ClienteData>
  ): Partial<Omit<ClienteData, 'slug'>> {
    const changedFields: Partial<Omit<ClienteData, 'slug'>> = {};

    // Verifica se originalCliente está definido
    if (!this.originalCliente) {
      console.error('originalCliente não está definido.');
      return changedFields;
    }

    Object.keys(formValue).forEach((key) => {
      // Ignorar explicitamente o campo 'slug'
      if (key === 'slug') return;

      // Fazer type assertion para a chave
      const typedKey = key as keyof Omit<ClienteData, 'slug'>;

      // Evitar erros acessando valores indefinidos
      const originalValue = this.originalCliente[typedKey];
      const newValue = formValue[typedKey];

      // Comparar valores e atualizar somente se houver mudanças
      if (originalValue !== newValue) {
        changedFields[typedKey] = newValue as any;
      }
    });

    return changedFields;
  }

  getFormControl(controlName: string): FormControl {
    return this.clienteForm.get(controlName) as FormControl;
  }
}
