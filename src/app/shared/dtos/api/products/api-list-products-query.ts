import { TProductCategory } from '../../../types/product-category';
import { IApiPaginationQuery } from '../pagination-query';

export interface IApiListProductsQuery extends IApiPaginationQuery {
  name?: string;
  hasStock?: boolean;
  category?: TProductCategory;
  minPrice?: number;
  maxPrice?: number;
}
