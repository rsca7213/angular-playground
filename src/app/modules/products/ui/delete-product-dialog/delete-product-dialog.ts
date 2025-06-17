import { Component, inject, input, output, viewChild } from '@angular/core';
import { FormUtils } from '../../../../shared/ui/form-utils/form-utils';
import { ApiProducts } from '../../../../shared/services/api/products/api-products';
import { Dialog } from '../../../../shared/ui/dialog/dialog';
import { FormGroup } from '@angular/forms';
import { IApiErrorResponse } from '../../../../shared/dtos/api/error-response';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { IconButton } from '../../../../shared/ui/icon-button/icon-button';
import { heroTrashSolid } from '@ng-icons/heroicons/solid';
import { Button } from '../../../../shared/ui/button/button';
import { heroExclamationTriangle } from '@ng-icons/heroicons/outline';

@Component({
  selector: 'app-delete-product-dialog',
  imports: [Dialog, NgIcon, IconButton, Button],
  templateUrl: './delete-product-dialog.html',
  providers: [provideIcons({ heroTrashSolid, heroExclamationTriangle })]
})
export class DeleteProductDialog extends FormUtils {
  // Injected services
  private readonly apiProducts = inject(ApiProducts);

  // Data
  public readonly name = input.required<string>();
  public readonly description = input.required<string>();
  public readonly id = input.required<string>();

  // Content
  protected readonly dialog = viewChild.required(Dialog);

  // Outputs
  protected readonly productDeleted = output<string>();

  // Form configuration (empty for delete dialog)
  protected override readonly form = new FormGroup({});
  protected override readonly formErrorMessages = {};

  protected override async submitLogic(): Promise<void> {
    this.apiProducts.delete({ id: this.id() }).subscribe({
      next: () => {
        this.success.set(true);
        this.productDeleted.emit(this.id());
        this.dialog().close();
      },
      error: (err: IApiErrorResponse) => {
        this.submissionError.set(err.error.message);
      }
    });
  }
}
