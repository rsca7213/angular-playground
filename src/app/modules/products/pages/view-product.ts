import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly apiProducts = inject(ApiProducts);

  // Route parameters
  protected productId = '';

  // Data properties
  protected product: IApiFindProductResponse | null = null;

  // Lifecycle hooks
  public ngOnInit(): void {
    this.setupRouteParameters();
    this.fetchProductDetails();
  }

  // Private methods
  private setupRouteParameters(): void {
    const parameters = this.activatedRoute.snapshot.paramMap;

    this.productId = parameters.get('id') ?? '';

    if (!this.productId) {
      // If no product ID is provided, return to the products page
      this.router.navigate(['/products']);
    }
  }

  private fetchProductDetails(): void {
    this.apiProducts.findById({ id: this.productId }).subscribe({
      next: (product) => {
        this.product = product;
      }
    });
  }
}
