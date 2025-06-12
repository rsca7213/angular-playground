import { Component, computed, model, output } from '@angular/core';
import { IApiPaginationResponse } from '../../dtos/api/pagination-response';
import { MAX_PAGES_TO_SHOW } from '../../constants/pagination';
import { Button } from '../button/button';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  heroChevronDoubleLeftSolid,
  heroChevronDoubleRightSolid,
  heroChevronLeftSolid,
  heroChevronRightSolid
} from '@ng-icons/heroicons/solid';
import { Badge } from '../badge/badge';

@Component({
  selector: 'app-pagination',
  imports: [Button, NgIcon, Badge],
  templateUrl: './pagination.html',
  providers: [
    provideIcons({
      heroChevronLeftSolid,
      heroChevronDoubleLeftSolid,
      heroChevronRightSolid,
      heroChevronDoubleRightSolid
    })
  ]
})
export class Pagination {
  public readonly information = model.required<IApiPaginationResponse<unknown>>();

  public readonly pageRange = computed(() => {
    const current = this.information().page;
    const total = this.information().totalPages;
    const candidateMaxLimit = current + MAX_PAGES_TO_SHOW;
    const candidateMinLimit = current - MAX_PAGES_TO_SHOW;

    const maxPage = Math.min(candidateMaxLimit, total);
    const minPage = Math.max(candidateMinLimit, 1);

    return Array.from({ length: maxPage - minPage + 1 }, (_, index) => minPage + index);
  });

  public readonly goToPage = output<number>();

  protected nextPage(): void {
    // Skip if there are no more pages
    if (!this.information().hasNextPage) return;

    // Emit the next page number
    this.goToPage.emit(this.information().page + 1);
  }

  protected previousPage(): void {
    // Skip if we are already on the first page
    if (!this.information().hasPreviousPage) return;

    // Emit the previous page number
    this.goToPage.emit(this.information().page - 1);
  }

  protected goToPageNumber(page: number): void {
    // Skip if the page number is out of bounds
    if (page < 1 || page > this.information().totalPages) return;

    // Emit the requested page number
    this.goToPage.emit(page);
  }

  protected goToFirstPage(): void {
    this.goToPageNumber(1);
  }

  protected goToLastPage(): void {
    this.goToPageNumber(this.information().totalPages);
  }
}
