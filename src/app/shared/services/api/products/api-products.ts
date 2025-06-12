import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IApiPaginationResponse } from '../../../dtos/api/pagination-response';
import { IApiListProductsResponse } from '../../../dtos/api/products/api-list-products-response';
import { ENVIRONMENT } from '../../../../../environments/environment';
import { IApiListProductsQuery } from '../../../dtos/api/products/api-list-products-query';
import { IApiCreateProductBody } from '../../../dtos/api/products/api-create-product-body';
import { IApiCreateProductResponse } from '../../../dtos/api/products/api-create-product-response';

@Injectable({
  providedIn: 'root'
})
export class ApiProducts {
  private readonly http = inject(HttpClient);

  public list(
    query: IApiListProductsQuery
  ): Observable<IApiPaginationResponse<IApiListProductsResponse>> {
    return this.http.get<IApiPaginationResponse<IApiListProductsResponse>>(
      `${ENVIRONMENT.apiUrl}/products`,
      { params: query as HttpParams }
    );
  }

  public create(body: IApiCreateProductBody): Observable<IApiCreateProductResponse> {
    return this.http.post<IApiCreateProductResponse>(`${ENVIRONMENT.apiUrl}/products`, body);
  }
}
