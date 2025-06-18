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
import {
  heroCheckCircleSolid,
  heroEyeSolid,
  heroShoppingCartSolid
} from '@ng-icons/heroicons/solid';
import { UpdateProductDialog } from '../ui/update-product-dialog/update-product-dialog';
import { IApiUpdateProductResponse } from '../../../shared/dtos/api/products/api-update-product-response';
import { DeleteProductDialog } from '../ui/delete-product-dialog/delete-product-dialog';
import { IconButton } from '../../../shared/ui/icon-button/icon-button';
import { RouterLink } from '@angular/router';
import { HasRoles } from '../../../shared/directives/has-roles';

@Component({
  selector: 'app-products',
  imports: [
    ProductsTable,
    Pagination,
    ProductFilters,
    CreateProductDialog,
    UpdateProductDialog,
    DeleteProductDialog,
    Toast,
    IconButton,
    NgIcon,
    RouterLink,
    HasRoles
  ],
  templateUrl: './products.html',
  providers: [provideIcons({ heroCheckCircleSolid, heroShoppingCartSolid, heroEyeSolid })]
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
  protected readonly productUpdatedToast = viewChild.required<Toast>('productUpdatedToast');
  protected readonly productDeletedToast = viewChild.required<Toast>('productDeletedToast');

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
        this.errorMessage = err.message;
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

  public handleProductCreated(): void {
    // Re-fetch products after a new product is created
    this.fetchProducts();

    // Show a toast notification for product creation
    this.productCreatedToast().show();
  }

  public handleProductUpdated(response: IApiUpdateProductResponse): void {
    // Find the updated product's index in the current list by ID
    const index = this.products.items.findIndex((product) => product.id === response.id);

    // If not found, return early
    if (index === -1) return;

    // Update the product in the current list
    this.products.items[index] = response;

    // Show a toast notification for product update
    this.productUpdatedToast().show();
  }

  public handleProductDeleted(id: string): void {
    // Remove the deleted product from the current list
    this.products.items = this.products.items.filter((product) => product.id !== id);

    // Show a toast notification for product deletion
    this.productDeletedToast().show();
  }
}
