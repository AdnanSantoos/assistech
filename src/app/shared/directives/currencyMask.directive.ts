import { Directive, HostListener, Input, ElementRef, Renderer2 } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Directive({
  standalone: true,
  selector: '[currencyMask]',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: CurrencyMaskDirective,
      multi: true
    }
  ]
})
export class CurrencyMaskDirective implements ControlValueAccessor {
  private numericValue: number = 0;
  private onChange: (value: number) => void = () => {};
  private onTouched: () => void = () => {};

  @Input('currencyMask') set value(val: string | number) {
    if (val) {
      this.numericValue = typeof val === 'string' ?
        parseFloat(val.replace(/\D/g, '')) / 100 :
        val;
      this.updateInputValue();
    }
  }

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  @HostListener('input', ['$event'])
  onInput(event: any): void {
    const inputElement = event.target;
    let input = inputElement.value.replace(/\D/g, '');
    const length = input.length;

    if (length === 0) {
      this.numericValue = 0;
    } else {
      this.numericValue = parseFloat(input) / 100;
    }

    // Notify form of the numeric value
    this.onChange(this.numericValue);
    this.updateInputValue();
  }

  @HostListener('blur')
  onBlur(): void {
    this.onTouched();
  }

  // ControlValueAccessor implementation
  writeValue(value: number): void {
    this.numericValue = value || 0;
    this.updateInputValue();
  }

  registerOnChange(fn: (value: number) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  private updateInputValue(): void {
    const formattedValue = `R$ ${this.formatCurrency(this.numericValue)}`;
    this.renderer.setProperty(this.el.nativeElement, 'value', formattedValue);
  }

  private formatCurrency(value: number): string {
    return value.toFixed(2).replace('.', ',').replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  }
}
