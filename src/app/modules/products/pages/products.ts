import { Component, inject, OnInit, viewChild } from '@angular/core';
import { ProductsTable } from '../ui/products-table/products-table';
import { IApiListProductsResponse } from '../../../shared/dtos/api/products/api-list-products-response';
import { ApiProducts } from '../../../shared/services/api/products/api-products';
import { IApiErrorResponse } from '../../../shared/dtos/api/error-response';
import { Pagination } from '../../../shared/ui/pagination/pagination';
import { IApiPaginationResponse } from '../../../shared/dtos/api/pagination-response';
import { getDefaultPagination } from '../../../shared/utils/default-pagination';
import { ProductFilters } from '../ui/product-filters/product-filters';
import { IApiListProductsQuery } from '../../../shared/dtos/api/products/api-list-products-query';
import { CreateProductDialog } from '../ui/create-product-dialog/create-product-dialog';
import { Toast } from '../../../shared/ui/toast/toast';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { heroCheckCircleSolid } from '@ng-icons/heroicons/solid';
import { Alert } from '../../../shared/ui/alert/alert';

@Component({
  selector: 'app-products',
  imports: [ProductsTable, Pagination, ProductFilters, CreateProductDialog, Toast, NgIcon],
  templateUrl: './products.html',
  providers: [provideIcons({ heroCheckCircleSolid })]
})
export class Products implements OnInit {
  private readonly apiProducts = inject(ApiProducts);
  protected products: IApiPaginationResponse<IApiListProductsResponse> = getDefaultPagination();
  protected filters: IApiListProductsQuery = {
    page: 1
  };
  protected loading = true;
  protected errorMessage: string | null = null;

  protected readonly productCreatedToast = viewChild.required<Toast>('productCreatedToast');

  public ngOnInit(): void {
    this.fetchProducts();
  }

  public fetchProducts(): void {
    this.loading = true;
    this.errorMessage = null;
    this.apiProducts.list(this.filters).subscribe({
      next: (data) => {
        this.products = data;
        this.loading = false;
      },
      error: (err: IApiErrorResponse) => {
        this.errorMessage = err.error.message;
        this.loading = false;
      }
    });
  }

  public goToPage(page: number): void {
    this.filters.page = page;
    this.fetchProducts();
  }

  public applyFilters(filters: IApiListProductsQuery): void {
    // Swap all filters with the new ones
    this.filters = filters;

    // Reset the page to 1 when applying filters (also performs a fetch)
    this.goToPage(1);
  }

  public handleProductCreated(product: IApiListProductsResponse): void {
    // Re-fetch products after a new product is created
    this.fetchProducts();

    // Show a toast notification for product creation
    this.productCreatedToast().show();
  }
}
