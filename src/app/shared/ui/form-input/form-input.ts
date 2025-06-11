import { Component, input } from '@angular/core';
import { TFormInputType } from '../../types/form-inputs';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { TSelectOptions } from '../../types/select-options';

@Component({
  selector: 'app-form-input',
  imports: [ReactiveFormsModule],
  templateUrl: './form-input.html'
})
export class FormInput<T> {
  // Form input configuration properties
  public readonly type = input.required<TFormInputType>();
  public readonly id = input.required<string>();
  public readonly label = input.required<string>();
  public readonly placeholder = input.required<string>();
  public readonly hint = input<string | null>(null);
  public readonly required = input<boolean>(false);
  public readonly error = input<string | null>(null);

  // Form control for the input
  public readonly control = input.required<FormControl>();

  // Select input specific properties
  public readonly options = input<TSelectOptions<T> | null>(null);
  public readonly allowNullOption = input<boolean>(false);

  // Number input specific properties
  public readonly min = input<number | null>(null);
  public readonly max = input<number | null>(null);
  public readonly step = input<number | null>(null);
}
