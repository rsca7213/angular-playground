import { Component, input, model } from '@angular/core';
import { TFormInputType } from '../../types/form-inputs';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

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

  public readonly control = input.required<FormControl>();
}
