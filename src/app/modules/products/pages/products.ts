import { Component, inject, OnInit } from '@angular/core';
import { ProductsTable } from '../ui/products-table/products-table';
import { IApiListProductsResponse } from '../../../shared/dtos/api/products/api-list-products-response';
import { ApiProducts } from '../../../shared/services/api/products/api-products';
import { IApiErrorResponse } from '../../../shared/dtos/api/error-response';
import { Pagination } from '../../../shared/ui/pagination/pagination';
import { IApiPaginationResponse } from '../../../shared/dtos/api/pagination-response';
import { getDefaultPagination } from '../../../shared/utils/default-pagination';

@Component({
  selector: 'app-products',
  imports: [ProductsTable, Pagination],
  templateUrl: './products.html'
})
export class Products implements OnInit {
  private readonly apiProducts = inject(ApiProducts);
  protected products: IApiPaginationResponse<IApiListProductsResponse> = getDefaultPagination();
  protected loading = true;
  protected errorMessage: string | null = null;
  private currentPage = 1;

  public ngOnInit(): void {
    this.fetchProducts();
  }

  public fetchProducts(): void {
    this.apiProducts
      .list({
        page: this.currentPage
      })
      .subscribe({
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
    this.currentPage = page;
    this.loading = true;
    this.errorMessage = null;
    this.fetchProducts();
  }
}
