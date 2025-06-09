import { TProductCategory } from '../../../types/product-category';

export interface IApiListProductsResponse {
  id: string;
  name: string;
  description: string;
  price: number;
  category: TProductCategory;
  stockQuantity: number;
}
