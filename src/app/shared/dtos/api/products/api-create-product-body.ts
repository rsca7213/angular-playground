import { TProductCategory } from '../../../types/product-category';

export interface IApiCreateProductBody {
  name: string;
  description: string;
  stockQuantity: number;
  category: TProductCategory;
  price: number;
}
