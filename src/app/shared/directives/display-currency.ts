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

  private formatValue(): void {
    let rawValue: string = this.element.nativeElement.value;

    // Remove any non numeric characters except for the decimal point
    let value: string = rawValue.replace(/[^0-9.]/g, '');

    // If the value is empty, set it to an empty string
    if (value === '') {
      this.element.nativeElement.value = '';
      return;
    }

    // Remove any leading decimal point
    value = value.replace(/^\./, '');

    // Remove duplicate decimal points
    value = value.replace(/\.{2,}/g, '.');

    // Remove leading zeros
    value = value.replace(/^0+(?=\d)/, '');

    // If the decimal point is present, ensure only exactly the specified number of decimal places
    const parts = value.split('.');
    if (parts.length === 2) {
      value = parts[0] + '.' + parts[1].substring(0, this.decimalPlaces() || 2);
    }

    // If min or max are set, validate the value
    const numericValue = Number(value);
    if (this.min() !== null && numericValue < this.min()!) value = this.min()!.toString();
    if (this.max() !== null && numericValue > this.max()!) value = this.max()!.toString();

    // Apply currency pipe formatting
    value =
      this.currencyPipe.transform(
        value,
        this.currency(),
        'symbol',
        `1.0-${this.decimalPlaces() || 2}`
      ) || '';

    // If the user attempted to type a leading decimal and the pipe removed it, restore it
    if (rawValue[rawValue.length - 1] === '.') {
      value = `${value}.`;
    }

    // Set the formatted value back to the input
    this.element.nativeElement.value = value;
    this.control.control?.setValue(value);
  }
}
