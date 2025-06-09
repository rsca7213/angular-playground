import { TProductCategory } from '../../../types/product-category';

export interface IApiCreateProductResponse {
  id: string;
  name: string;
  description: string;
  price: number;
  category: TProductCategory;
  stockQuantity: number;
  imageUrl: string | null;
}
