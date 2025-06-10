import { Component, input } from '@angular/core';
import { provideTableIcons, provideTableImports, Table } from '../../../../shared/ui/table/table';
import { IApiListProductsResponse } from '../../../../shared/dtos/api/products/api-list-products-response';
import { ITableConfig } from '../../../../shared/interfaces/ui/table';
import { CurrencyPipe, TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-products-table',
  imports: provideTableImports,
  templateUrl: '../../../../shared/ui/table/table.html',
  providers: [provideTableIcons()]
})
export class ProductsTable extends Table<IApiListProductsResponse> {
  public override readonly data = input.required<IApiListProductsResponse[]>();
  public override readonly config: ITableConfig<IApiListProductsResponse> = {
    actions: {
      view: true,
      update: true,
      delete: true
    },
    defaultErrorMessage: 'An error occurred while fetching the products.',
    displayIndexColumn: true,
    columns: [
      {
        name: 'name',
        label: 'Name'
      },
      {
        name: 'description',
        label: 'Description'
      },
      {
        name: 'category',
        label: 'Category',
        applyPipes: [new TitleCasePipe()]
      },
      {
        name: 'price',
        label: 'Price',
        align: 'right',
        applyPipes: [new CurrencyPipe('en-US')]
      },
      {
        name: 'stockQuantity',
        label: 'Stock',
        align: 'right'
      }
    ]
  };
}
