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
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';
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
    DiarioOficialLayoutComponent,
  NgxExtendedPdfViewerModule],
  templateUrl: './diario-oficial-visualizacao.component.html',
  styleUrl: './diario-oficial-visualizacao.component.scss'
})
export class DiarioOficialVisualizacaoComponent {
  documentUrl: string;

  documentTitle!: string;

  constructor(private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    const url = navigation?.extras?.state?.['url']
    this.documentUrl = url;
  }

  downloadDocument(): void {
    const link = document.createElement('a');
    link.href = this.documentUrl;
    link.target = '_blank';
    link.download = this.documentTitle;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  printDocument(): void {
  }
}
