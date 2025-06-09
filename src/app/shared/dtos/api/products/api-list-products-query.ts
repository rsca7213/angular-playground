import { TProductCategory } from '../../../types/product-category';

export interface IApiListProductsQuery {
  name?: string;
  hasStock?: boolean;
  category?: TProductCategory;
  minPrice?: number;
  maxPrice?: number;
}
