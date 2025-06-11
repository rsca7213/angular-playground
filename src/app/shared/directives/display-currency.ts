import { CurrencyPipe } from '@angular/common';
import { Directive, ElementRef, HostListener, inject, input, OnInit } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[appDisplayCurrency]',
  providers: [CurrencyPipe]
})
export class DisplayCurrency implements OnInit {
  public readonly min = input<number | null>(null);
  public readonly max = input<number | null>(null);
  public readonly decimalPlaces = input<number | null>(2);
  public readonly currency = input.required<string>();
  public readonly element = inject(ElementRef);
  public readonly control = inject(NgControl);
  public readonly currencyPipe = inject(CurrencyPipe);

  public constructor() {}

  public ngOnInit(): void {
    this.formatValue();
  }

  @HostListener('input')
  public onBlur(): void {
    this.formatValue();
  }

  private verifyLimits(value: string): string {
    const numericValue = Number(value);
    if (this.min() !== null && numericValue < this.min()!) value = this.min()!.toString();
    if (this.max() !== null && numericValue > this.max()!) value = this.max()!.toString();

    return value;
  }

  private verifyCommonRegex(value: string): string {
    // Remove any non-numeric characters except for the decimal point
    value = value.replace(/[^0-9.]/g, '');

    // Remove leading decimal point
    value = value.replace(/^\./, '');

    // Remove leading zeros
    value = value.replace(/^0+(?=\d)/, '');

    return value;
  }

  private verifyDecimalPlaces(value: string): string {
    // If decimal places are specified, ensure the value has at most that many decimal places
    if (this.decimalPlaces() !== null) {
      const parts = value.split('.');
      if (parts.length === 2) {
        parts[1] = parts[1].substring(0, this.decimalPlaces()!);
        value = parts.join('.');
      }
    }

    // Find all ocurrences of a decimal point
    const decimalPoints = value.match(/\./g) || [];

    // If there are multiple decimal points, remove all but the first one
    if (decimalPoints.length > 1) {
      const firstDecimalIndex = value.indexOf('.');
      value =
        value.substring(0, firstDecimalIndex + 1) +
        value.substring(firstDecimalIndex + 1).replace(/\./g, '');
    }

    return value;
  }

  private formatValue(): void {
    let rawValue: string = this.element.nativeElement.value;
    let value: string = rawValue;

    // If the value is empty, set it to an empty string
    if (value === '') {
      this.element.nativeElement.value = '';
      return;
    }

    // Apply transformations
    value = this.verifyCommonRegex(value);
    value = this.verifyLimits(value);
    value = this.verifyDecimalPlaces(value);

    // Apply currency pipe formatting
    value =
      this.currencyPipe.transform(
        value,
        this.currency(),
        'symbol',
        `1.0-${this.decimalPlaces() || 2}`
      ) || '';

    // If the user attempted to type a leading decimal and the pipe removed it, restore it
    if (rawValue[rawValue.length - 1] === '.' && !value.includes('.')) {
      value = `${value}.`;
    }

    // Set the formatted value back to the input
    this.element.nativeElement.value = value;
    this.control.control?.setValue(value);
  }
}
