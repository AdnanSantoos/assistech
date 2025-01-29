import { CommonModule, Location } from '@angular/common';
import { Component, OnDestroy, OnInit, TemplateRef } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  ActivatedRoute,
  NavigationEnd,
  NavigationError,
  Router,
  RouterLink,
} from '@angular/router';
import { TenantFullModel, TipoRota } from '../../models/shared.model';
import { TenantService } from '../../services/tenant.service';
import { LoginService } from '../../../features/login/services/login.service';
import { finalize, Subject, takeUntil } from 'rxjs';
import { NgxLoadingModule } from 'ngx-loading';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    MatButtonModule,
    MatIconModule,
    CommonModule,
    RouterLink,
    ReactiveFormsModule,
  ],
  providers: [BrowserAnimationsModule, BsModalService],
  animations: [
    trigger('toggleMenu', [
      state(
        'inactive',
        style({
          opacity: 0,
          transform: 'translateX(-100%)',
        })
      ),
      state(
        'active',
        style({
          opacity: 1,
          transform: 'translateX(0)',
        })
      ),
      transition('inactive => active', [animate('300ms ease-in')]),
      transition('active => inactive', [animate('300ms ease-out')]),
    ]),
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent implements OnInit, OnDestroy {
  mobile = false;
  logoText1: string = '';
  tenant!: string;
  logoText2 = '';
  tipoRota: TipoRota = null;
  isAdmRoute = false;
  isLoginRoute = false;
  isDiarioRoute = false;
  isPortalTransparencia = false;
  loggedInUserEmail: string | null = null;
  logo: string | null = null;
  state!: TenantFullModel;
  loading = true;
  defaultLogo = '../../../../assets/logos/admin.png';
  private destroy$ = new Subject<void>();
  slug: string | null = null;

  profileForm!: FormGroup;
  modalRef?: BsModalRef;
  isOpen = false;


  showCurrentPassword = false;
  showNewPassword = false;
  showConfirmPassword = false;

  constructor(
    private router: Router,
    private location: Location,
    private fb: FormBuilder,
    private modalService: BsModalService,
    private tenantService: TenantService,
    private _loginService: LoginService,
    public route: ActivatedRoute
  ) {
    const currentUrl = this.location.path();
    this.checkRoute(currentUrl);
    let name = localStorage.getItem('name');
    this.logoText2 = name!;
    this.tenantService.state$
      .pipe(
        takeUntil(this.destroy$),
        finalize(() => (this.loading = false))
      )
      .subscribe((v) => {
        if (v) {
          this.state = v;
          this.logoText2 = this.state.name;
          this.logo = this.state.logo;
          if (!this.logo) {
            this.logo = this.defaultLogo;
          }
        }
      });
    this.tenantService.slug$
      .pipe(takeUntil(this.destroy$))
      .subscribe((slug) => {
        this.slug = slug;
      });

    router.events.subscribe((event) => {
      if (event instanceof NavigationError) {
        console.log('Erro de navegação:', event.error);
      }
    });

    this.profileForm = this.fb.group(
      {
        name: ['', Validators.required],
        current_password: ['', Validators.required],
        password: ['', Validators.required],
        password_confirmation: ['', Validators.required],
      },
      { validator: this.passwordMatchValidator }
    );

    this.profileForm.get('password')?.valueChanges.subscribe(() => {
      this.profileForm.get('password_confirmation')?.updateValueAndValidity();
    });

    this.profileForm
      .get('password_confirmation')
      ?.setValidators([
        Validators.required,
        this.matchValidator(this.profileForm.get('password')!),
      ]);
  }
  matchValidator(controlToMatch: AbstractControl): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (control.value === null || control.value === '') return null;
      return controlToMatch.value === control.value ? null : { mismatch: true };
    };
  }
  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.checkRoute(event.url);
      }
    });
    this.getLoggedInUserEmail();
  }
  passwordMatchValidator(g: FormGroup) {
    const password = g.get('password')?.value;
    const passwordConfirmation = g.get('password_confirmation')?.value;

    if (password && passwordConfirmation) {
      return password === passwordConfirmation
        ? null
        : { passwordMismatch: true };
    }
    return null;
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
  onImageError() {
    this.logo = this.defaultLogo;
  }

  navigate() {
    const token = localStorage.getItem('authToken');
    if (token) {
      this.router.navigate(
        ['app', this.slug, 'adm', 'dashboard-administrativo', 'home'],
        {
          skipLocationChange: false,
          replaceUrl: false,
        }
      );
    } else {
      this.router.navigate(['app', this.slug, 'adm', 'login'], {
        skipLocationChange: false,
        replaceUrl: false,
      });
    }
  }

  checkRoute(url: string) {
    this.isAdmRoute = url.includes('/adm/');
    this.isPortalTransparencia = url.includes('/trn');
    this.isLoginRoute = url.includes('/adm/login');
    this.isDiarioRoute = url.includes('/diario-oficial');
    if (this.isAdmRoute) {
      this.logoText1 = 'Portal Administrativo';
    } else if (this.isPortalTransparencia) {
      this.logoText1 = 'Portal de Transparência';
    } else {
      this.logoText1 = 'DIÁRIO MUNICIPAL DA  CÂMARA DE';
    }
  }

  toggleMenu() {
    this.mobile = !this.mobile;
  }

  logout() {
    const tenant = this.tenantService.getTenant();
    if (tenant) {
      this._loginService.logout(tenant);
    }
  }
  getLoggedInUserEmail(): void {
    const email = localStorage.getItem('email');
    this.loggedInUserEmail = email ? email : 'Usuário não logado';
  }

  openProfileModal(template: TemplateRef<any>) {
    const tenant = this.tenantService.getTenant();
    if (tenant) {
      this.tenantService.getDados(tenant).subscribe({
        next: (response) => {
          this.profileForm.patchValue({
            name: response.data.name,
          });
          this.modalRef = this.modalService.show(template, {
            class: 'modal-md',
          });
          this.isOpen = false; // Close dropdown when modal opens
        },
        error: (error) => {
          console.error('Error fetching user data:', error);
        },
      });
    }
  }

  onProfileSubmit() {
    if (this.profileForm.valid) {
      console.log('Profile form submitted:', this.profileForm.value);
      this.closeModal();
    }
  }

  closeModal() {
    if (this.modalRef) {
      this.modalRef.hide();
    }
  }

  onUpdateProfile() {
    if (this.profileForm.get('name')?.valid) {
      const tenant = this.tenantService.getTenant();
      if (tenant) {
        const data = {
          name: this.profileForm.get('name')?.value,
        };

        this.tenantService.updateProfile(tenant, data).subscribe({
          next: (response) => {
            console.log('Profile updated successfully:', response);
            // Você pode adicionar uma notificação de sucesso aqui
            this.closeModal();
          },
          error: (error) => {
            console.error('Error updating profile:', error);
            // Você pode adicionar uma notificação de erro aqui
          },
        });
      }
    }
  }

  onUpdatePassword() {
    const passwordControls = [
      'current_password',
      'password',
      'password_confirmation',
    ];
    const passwordsValid = passwordControls.every(
      (control) => this.profileForm.get(control)?.valid
    );

    if (
      passwordsValid &&
      !this.profileForm.get('password_confirmation')?.errors?.['mismatch']
    ) {
      const tenant = this.tenantService.getTenant();
      if (tenant) {
        const data = {
          current_password: this.profileForm.get('current_password')?.value,
          password: this.profileForm.get('password')?.value,
          password_confirmation: this.profileForm.get('password_confirmation')
            ?.value,
        };

        this.tenantService
          .updatePassword(tenant, data)
          .subscribe(() => this.closeModal());
      }
    }
  }
}
