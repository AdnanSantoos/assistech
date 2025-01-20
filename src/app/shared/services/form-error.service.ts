// form-error.service.ts
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FormErrorService {
  
  /**
   * Processa erros de API e aplica ao formulário
   */
  handleApiErrors(form: FormGroup, error: HttpErrorResponse): void {
    // Se não tiver a estrutura de erro esperada, retorna
    if (!error.error?.errors) return;

    // Limpa erros anteriores
    this.clearFormErrors(form);

    // Aplica os novos erros
    Object.keys(error.error.errors).forEach(fieldName => {
      const control = form.get(fieldName);
      if (control) {
        control.setErrors({
          serverError: error.error.errors[fieldName][0]
        });
        control.markAsTouched();
      }
    });
  }

  /**
   * Limpa todos os erros do formulário
   */
  clearFormErrors(form: FormGroup): void {
    Object.keys(form.controls).forEach(key => {
      const control = form.get(key);
      if (control) {
        control.setErrors(null);
      }
    });
  }

  /**
   * Verifica se um campo específico tem erro
   */
  hasFieldError(form: FormGroup, fieldName: string): boolean {
    const control = form.get(fieldName);
    return control ? (control.errors !== null && control.touched) : false;
  }

  /**
   * Retorna a mensagem de erro de um campo
   */
  getFieldErrorMessage(form: FormGroup, fieldName: string): string | null {
    const control = form.get(fieldName);
    if (control?.errors) {
      if (control.errors['serverError']) {
        return control.errors['serverError'];
      }
      // Aqui você pode adicionar mais tipos de erros se necessário
    }
    return null;
  }
}