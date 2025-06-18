import { Component, inject, input, output, viewChild } from '@angular/core';
import { FormUtils } from '../../../../shared/ui/form-utils/form-utils';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TProductCategory } from '../../../../shared/types/product-category';
import { productCategoryOptions } from '../../../../shared/constants/product-category-options';
import { Dialog } from '../../../../shared/ui/dialog/dialog';
import { IApiUpdateProductResponse } from '../../../../shared/dtos/api/products/api-update-product-response';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { heroCheckCircleSolid, heroPencilSolid, heroXMarkSolid } from '@ng-icons/heroicons/solid';
import { Alert } from '../../../../shared/ui/alert/alert';
import { FormInput } from '../../../../shared/ui/form-input/form-input';
import { Button } from '../../../../shared/ui/button/button';
import { IconButton } from '../../../../shared/ui/icon-button/icon-button';
import { IApiUpdateProductBody } from '../../../../shared/dtos/api/products/api-update-product-body';
import { ApiProducts } from '../../../../shared/services/api/products/api-products';
import { deformatCurrency } from '../../../../shared/utils/currency-utils';
import { IApiErrorResponse } from '../../../../shared/dtos/api/error-response';
import { heroExclamationTriangle } from '@ng-icons/heroicons/outline';

@Component({
  selector: 'app-update-product-dialog',
  imports: [Dialog, NgIcon, ReactiveFormsModule, Alert, FormInput, Button, IconButton],
  templateUrl: './update-product-dialog.html',
  providers: [
    provideIcons({
      heroPencilSolid,
      heroXMarkSolid,
      heroCheckCircleSolid,
      heroExclamationTriangle
    })
  ]
})
export class UpdateProductDialog extends FormUtils {
  // Injected services
  private readonly apiProducts = inject(ApiProducts);

  // Data
  public readonly product = input.required<IApiUpdateProductBody>();
  public readonly id = input.required<string>();

  // Content
  protected readonly dialog = viewChild.required(Dialog);

  // Outputs
  protected readonly productUpdated = output<IApiUpdateProductResponse>();

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
    this.request = this.apiProducts
      .update(
        {
          name: this.form.value.name!,
          description: this.form.value.description!,
          stockQuantity: this.form.value.stockQuantity!,
          category: this.form.value.category!,
          price: deformatCurrency(this.form.value.price!)
        },
        { id: this.id() }
      )
      .subscribe({
        // Handle success case by closing the dialog and emitting  the updated product
        next: (res) => {
          this.success.set(true);
          this.dialog().close();
          this.productUpdated.emit(res);
        },
        // Handle error case by setting the submission error
        error: (err: IApiErrorResponse) => {
          this.submissionError.set(err.message);
        }
      });
  }

  public setup(): void {
    // Set initial form values from the product input
    this.form.patchValue({
      name: this.product().name,
      description: this.product().description,
      stockQuantity: this.product().stockQuantity,
      category: this.product().category,
      price: this.product().price.toString()
    });
  }
}
