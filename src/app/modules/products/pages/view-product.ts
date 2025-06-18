import { Component, inject, input, OnInit } from '@angular/core';
import { ApiProducts } from '../../../shared/services/api/products/api-products';
import { IApiFindProductResponse } from '../../../shared/dtos/api/products/api-find-product-response';
import { CurrencyPipe } from '@angular/common';
import { DeEnumPipe } from '../../../shared/pipes/de-enum-pipe';

@Component({
  selector: 'app-view-product',
  imports: [CurrencyPipe, DeEnumPipe],
  templateUrl: './view-product.html'
})
export class ViewProduct implements OnInit {
  // Injected services
  private readonly apiProducts = inject(ApiProducts);

  // Route parameters
  public readonly id = input.required<string>();

  // Data properties
  protected product: IApiFindProductResponse | null = null;

  // Lifecycle hooks
  public ngOnInit(): void {
    this.fetchProductDetails();
  }

  private fetchProductDetails(): void {
    this.apiProducts.findById({ id: this.id() }).subscribe({
      next: (product) => {
        this.product = product;
      }
    });
  }
}
