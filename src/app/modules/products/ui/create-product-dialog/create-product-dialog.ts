import { Component, inject, output, viewChild } from '@angular/core';
import { Dialog } from '../../../../shared/ui/dialog/dialog';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { heroExclamationTriangle, heroPlus } from '@ng-icons/heroicons/outline';
import { Button } from '../../../../shared/ui/button/button';
import { heroCheckCircleSolid } from '@ng-icons/heroicons/solid';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormInput } from '../../../../shared/ui/form-input/form-input';
import { FormUtils } from '../../../../shared/ui/form-utils/form-utils';
import { TProductCategory } from '../../../../shared/types/product-category';
import { productCategoryOptions } from '../../../../shared/constants/product-category-options';
import { ApiProducts } from '../../../../shared/services/api/products/api-products';
import { IApiErrorResponse } from '../../../../shared/dtos/api/error-response';
import { deformatCurrency } from '../../../../shared/utils/currency-utils';
import { IApiCreateProductResponse } from '../../../../shared/dtos/api/products/api-create-product-response';
import { Alert } from '../../../../shared/ui/alert/alert';

@Component({
  selector: 'app-create-product-dialog',
  imports: [Dialog, Button, NgIcon, ReactiveFormsModule, FormInput, Alert],
  templateUrl: './create-product-dialog.html',
  providers: [provideIcons({ heroPlus, heroCheckCircleSolid, heroExclamationTriangle })]
})
export class CreateProductDialog extends FormUtils {
  // Injected services
  private readonly apiProducts = inject(ApiProducts);

  // Content
  protected readonly dialog = viewChild.required(Dialog);

  // Outputs
  protected readonly productCreated = output<IApiCreateProductResponse>();

  // Constants
  protected readonly productCategoryOptions = productCategoryOptions;

  // Form configuration
  protected override readonly form = new FormGroup({
    name: new FormControl<string>('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(100)
    ]),
    description: new FormControl<string>('', [
      Validators.required,
      Validators.minLength(10),
      Validators.maxLength(500)
    ]),
    stockQuantity: new FormControl<number>(0, [Validators.required, Validators.min(0)]),
    category: new FormControl<TProductCategory>(productCategoryOptions[0].value, [
      Validators.required
    ]),
    price: new FormControl<string>('', [Validators.required, Validators.min(0.01)])
  });
  protected override readonly formErrorMessages = {
    name: {
      required: 'Product name is required',
      minlength: 'Product name must be at least 3 characters long',
      maxlength: 'Product name cannot exceed 100 characters'
    },
    description: {
      required: 'Product description is required',
      minlength: 'Product description must be at least 10 characters long',
      maxlength: 'Product description cannot exceed 500 characters'
    },
    stockQuantity: {
      required: 'Stock is required',
      min: 'Stock cannot be negative'
    },
    category: {
      required: 'Category is required'
    },
    price: {
      required: 'Price is required',
      min: 'Price must be at least 0.01'
    }
  };

  protected override async submitLogic(): Promise<void> {
    // Perform the product creation
    this.request = this.apiProducts
      .create({
        name: this.form.value.name!,
        description: this.form.value.description!,
        stockQuantity: this.form.value.stockQuantity!,
        category: this.form.value.category!,
        price: deformatCurrency(this.form.value.price!)
      })
      .subscribe({
        // Handle success case by closing the dialog and emitting the created product
        next: (res) => {
          this.success.set(true);
          this.dialog().close();
          this.productCreated.emit(res);
        },
        // Handle error case by setting the submission error
        error: (err: IApiErrorResponse) => {
          this.submissionError.set(err.error.message);
        }
      });
  }
}
