import { Component, inject, OnInit } from '@angular/core';
import { ProductsTable } from '../ui/products-table/products-table';
import { IApiListProductsResponse } from '../../../shared/dtos/api/products/api-list-products-response';
import { ApiProducts } from '../../../shared/services/api/products/api-products';
import { IApiErrorResponse } from '../../../shared/dtos/api/error-response';
import { Pagination } from '../../../shared/ui/pagination/pagination';
import { IApiPaginationResponse } from '../../../shared/dtos/api/pagination-response';
import { getDefaultPagination } from '../../../shared/utils/default-pagination';
import { ProductFilters } from '../ui/product-filters/product-filters';
import { IApiListProductsQuery } from '../../../shared/dtos/api/products/api-list-products-query';

@Component({
  selector: 'app-products',
  imports: [ProductsTable, Pagination, ProductFilters],
  templateUrl: './products.html'
})
export class Products implements OnInit {
  private readonly apiProducts = inject(ApiProducts);
  protected products: IApiPaginationResponse<IApiListProductsResponse> = getDefaultPagination();
  protected filters: IApiListProductsQuery = {
    page: 1
  };
  protected loading = true;
  protected errorMessage: string | null = null;

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
      error: (err: { error: IApiErrorResponse }) => {
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
}
