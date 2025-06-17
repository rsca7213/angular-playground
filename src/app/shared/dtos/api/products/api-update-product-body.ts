import { TProductCategory } from '../../../types/product-category';

export interface IApiUpdateProductBody {
  name: string;
  description: string;
  stockQuantity: number;
  category: TProductCategory;
  price: number;
}
