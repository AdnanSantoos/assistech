import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { MatIcon } from '@angular/material/icon';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { DiarioOficialLayoutComponent } from '../../containers/diario-oficial-layout/diario-oficial-layout.component';
import { PdfViewerModule } from 'ng2-pdf-viewer';
@Component({
  selector: 'app-diario-oficial-visualizacao',
  standalone: true,
  imports: [CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatIcon,
    RouterLink,
    MatButtonModule,
    DiarioOficialLayoutComponent],
  templateUrl: './diario-oficial-visualizacao.component.html',
  styleUrl: './diario-oficial-visualizacao.component.scss'
})
export class DiarioOficialVisualizacaoComponent {
  documentUrl: SafeResourceUrl;

  documentTitle: string = 'Título do Documento';

  constructor(private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    const url = navigation?.extras?.state?.['url']
    this.documentUrl = url;
  }
  downloadDocument(): void {
  }

  printDocument(): void {    
  }
}
