import { TProductCategory } from '../../../types/product-category';

export interface IApiUpdateProductResponse {
  id: string;
  name: string;
  description: string;
  price: number;
  category: TProductCategory;
  stockQuantity: number;
  imageUrl: string | null;
}
