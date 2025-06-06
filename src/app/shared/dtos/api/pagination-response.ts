export interface ApiPaginationResponse<T> {
  page: number;
  perPage: number;
  totalItems: number;
  totalPages: number;
  isFirstPage: boolean;
  isLastPage: boolean;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  items: T[];
}
