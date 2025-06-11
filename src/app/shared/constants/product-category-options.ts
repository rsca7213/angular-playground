import { TProductCategory } from '../types/product-category';
import { TSelectOptions } from '../types/select-options';

export const productCategoryOptions: TSelectOptions<TProductCategory> = [
  { value: 'ELECTRONICS', label: 'Electronics' },
  { value: 'CLOTHING', label: 'Clothing' },
  { value: 'HOME_APPLIANCES', label: 'Home Appliances' },
  { value: 'BOOKS', label: 'Books' },
  { value: 'TOYS', label: 'Toys' },
  { value: 'SPORTS', label: 'Sports' },
  { value: 'BEAUTY', label: 'Beauty' },
  { value: 'HEALTH', label: 'Health' },
  { value: 'AUTOMOTIVE', label: 'Automotive' },
  { value: 'GARDEN', label: 'Garden' },
  { value: 'FOOD', label: 'Food' }
];
