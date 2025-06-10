import { IApiPaginationResponse } from '../dtos/api/pagination-response';

export function getDefaultPagination<T>(): IApiPaginationResponse<T> {
  return {
    items: [],
    page: 1,
    perPage: 10,
    totalItems: 0,
    totalPages: 0,
    hasNextPage: false,
    hasPreviousPage: false,
    isFirstPage: true,
    isLastPage: true
  };
}
