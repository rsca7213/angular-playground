import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IApiPaginationResponse } from '../../../dtos/api/pagination-response';
import { IApiListProductsResponse } from '../../../dtos/api/products/api-list-products-response';
import { ENVIRONMENT } from '../../../../../environments/environment';
import { IApiListProductsQuery } from '../../../dtos/api/products/api-list-products-query';
import { IApiCreateProductBody } from '../../../dtos/api/products/api-create-product-body';
import { IApiCreateProductResponse } from '../../../dtos/api/products/api-create-product-response';
import { IApiUpdateProductBody } from '../../../dtos/api/products/api-update-product-body';
import { IApiUpdateProductParams } from '../../../dtos/api/products/api-update-product-params';
import { IApiUpdateProductResponse } from '../../../dtos/api/products/api-update-product-response';
import { IApiDeleteProductParams } from '../../../dtos/api/products/api-delete-product-params';
import { IApiFindProductParams } from '../../../dtos/api/products/api-find-product-params';
import { IApiFindProductResponse } from '../../../dtos/api/products/api-find-product-response';

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

  public findById(params: IApiFindProductParams): Observable<IApiFindProductResponse> {
    return this.http.get<IApiFindProductResponse>(`${ENVIRONMENT.apiUrl}/products/${params.id}`);
  }

  public create(body: IApiCreateProductBody): Observable<IApiCreateProductResponse> {
    return this.http.post<IApiCreateProductResponse>(`${ENVIRONMENT.apiUrl}/products`, body);
  }

  public update(
    body: IApiUpdateProductBody,
    params: IApiUpdateProductParams
  ): Observable<IApiUpdateProductResponse> {
    return this.http.put<IApiUpdateProductResponse>(
      `${ENVIRONMENT.apiUrl}/products/${params.id}`,
      body
    );
  }

  public delete(params: IApiDeleteProductParams): Observable<void> {
    return this.http.delete<void>(`${ENVIRONMENT.apiUrl}/products/${params.id}`);
  }
}
