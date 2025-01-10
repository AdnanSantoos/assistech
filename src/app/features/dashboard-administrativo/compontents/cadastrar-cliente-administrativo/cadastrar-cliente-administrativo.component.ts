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
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';

@Component({
  selector: 'app-cadastrar-cliente-administrativo',
  templateUrl: './cadastrar-cliente-administrativo.component.html',
  imports: [CommonModule, ReactiveFormsModule, TypeaheadModule,NgxMaskDirective],
  providers: [provideNgxMask()],
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
      address: this.fb.group({
        street: [null],
        number: [null],
        complement: [null],
        district: [null],
        zip: [null],
      }),
    });
    this.route.paramMap.subscribe((params) => {
      this.slug = params.get('slug');
      if (this.slug) {
        this.isEditMode = true;
        this._clienteService.getClienteBySlug(this.slug).subscribe((v) => {
          this.originalCliente = v.data;
          this.formularioOriginal = v.data;
          this.populaFormulario(v.data);

          // Armazene o estado inicial do formulário
          this.formularioOriginal = this.clienteForm.getRawValue();
        });
      }
    });

    this.setupCidadeAutoComplete();
  }

  populaFormulario(clienteData: any): void {
    this.clienteForm.patchValue({
      city: {
        code: clienteData.city?.code || '',
        label: clienteData.city?.label || '',
      },
      government_body: clienteData.government_body || '',
      name: clienteData.name || '',
      pncp: clienteData.pncp || false,
      portal_transparencia: clienteData.portal_transparencia || false,
      diario_oficial: clienteData.diario_oficial || false,
      beginning_official_gazette: clienteData.beginning_official_gazette || 0,
      slug: clienteData.slug || '',
      is_active: clienteData.is_active || true,
      domain: clienteData.domain || '',
      city_code: clienteData.city_code || '',
      next_edition_number: clienteData.next_edition_number || 0,
      file_is_sent_signed: clienteData.file_is_sent_signed || false,
      errors: clienteData.errors || null,
      address: {
        street: clienteData.address?.[0]?.street || '',
        number: clienteData.address?.[0]?.number || null,
        complement: clienteData.address?.[0]?.complement || '',
        district: clienteData.address?.[0]?.district || '',
        zip: clienteData.address?.[0]?.zip || null,
      },
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
    console.log('Dados do formulário:', formValue); // Adicionado para depuração

    this.isLoadingButton = true;
    this._clienteService.updateCliente(formValue.slug, formValue).subscribe({
      next: () => {
        this._toastrService.success(
          'Cliente atualizado com sucesso!',
          'Sucesso'
        );
        this.router.navigate(['/adm/dashboard-administrativo/cliente']);
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

  getFormControl(controlName: string): FormControl {
    return this.clienteForm.get(controlName) as FormControl;
  }
}
