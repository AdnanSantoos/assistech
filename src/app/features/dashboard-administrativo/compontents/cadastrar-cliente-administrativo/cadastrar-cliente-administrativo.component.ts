import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ClienteAdministrativoService } from '../cliente-administrativo/services/cliente-administrativo.service';
import { ToastrService } from 'ngx-toastr';
import { catchError, debounceTime, of, switchMap } from 'rxjs';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';

@Component({
  selector: 'app-cadastrar-cliente-administrativo',
  templateUrl: './cadastrar-cliente-administrativo.component.html',
  imports: [CommonModule, ReactiveFormsModule, TypeaheadModule],
  standalone: true,
  styleUrls: ['./cadastrar-cliente-administrativo.component.scss']
})
export class CadastrarClienteAdministrativoComponent implements OnInit {
  clienteForm!: FormGroup;
  cidadeOptions: any[] = [];
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private _clienteService: ClienteAdministrativoService,
    private _toastrService: ToastrService
  ) { }

  ngOnInit(): void {
    this.clienteForm = this.fb.group({
      agencies: [[]],
      city: this.fb.group({
        code: ['', Validators.required],
        label: ['', Validators.required],
        state_code: [''],
        uf: [''],
      }),
      city_name: ['', Validators.required],
      name: ['', Validators.required],
      permissions: this.fb.group({
        pncp: [false],
        portal_transparencia: [false],
        diario_oficial: [false],
      }),
      beginning_official_gazette: ['', Validators.required],
      slug: ['', Validators.required],
      state_uf: [''],
      domain: [''],
      next_edition_number: ['', Validators.required]
    });

    this.setupCidadeAutoComplete();
  }

  private setupCidadeAutoComplete(): void {
    this.clienteForm.get('city.label')?.valueChanges
      .pipe(
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
      slug,
    });

    console.log('Slug gerado:', slug);
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

    const mainPart = cityParts.length > 1
      ? cityParts[cityParts.length - 1]
      : normalizedCity;

    return (mainPart + (stateCode || '')).toLowerCase();
  }

  getFormControl(controlName: string): FormControl {
    return this.clienteForm.get(controlName) as FormControl;
  }
  onSubmit(): void {

    const clienteData = this.clienteForm.value;

    this._clienteService.createUser(clienteData).subscribe({
      next: (response) => {
        this._toastrService.success('Cliente criado com sucesso!', 'Sucesso');
        this.clienteForm.reset();
      },
      error: (err) => {
        this._toastrService.error(
          err?.error?.message || 'Erro ao criar cliente.',
          'Erro'
        );
      },
    });
  }
}
