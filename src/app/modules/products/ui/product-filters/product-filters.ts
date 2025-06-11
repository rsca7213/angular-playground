import { Component, OnInit, output } from '@angular/core';
import { FormInput } from '../../../../shared/ui/form-input/form-input';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { provideIcons } from '@ng-icons/core';
import { heroMagnifyingGlassSolid } from '@ng-icons/heroicons/solid';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { IApiListProductsQuery } from '../../../../shared/dtos/api/products/api-list-products-query';
import { TProductCategory } from '../../../../shared/types/product-category';
import { productCategoryOptions } from '../../../../shared/constants/product-category-options';
import { Card } from '../../../../shared/ui/card/card';

@Component({
  selector: 'app-product-filters',
  imports: [FormInput, ReactiveFormsModule, Card],
  templateUrl: './product-filters.html',
  providers: [provideIcons({ heroMagnifyingGlassSolid })]
})
export class ProductFilters implements OnInit {
  public readonly apply = output<IApiListProductsQuery>();
  protected readonly productCategoryOptions = productCategoryOptions;

  protected readonly form = new FormGroup({
    name: new FormControl<string | null>(null),
    hasStock: new FormControl<boolean | null>(null),
    category: new FormControl<TProductCategory | null>(null),
    minPrice: new FormControl<number | null>(null),
    maxPrice: new FormControl<number | null>(null)
  });

  public ngOnInit(): void {
    this.listenForFormChanges();
  }

  public listenForFormChanges(): void {
    this.form.valueChanges
      .pipe(
        debounceTime(1000), // Wait for 1 second after the last change
        distinctUntilChanged() // Only emit if the value has changed
      )
      .subscribe((form) => {
        const filters: IApiListProductsQuery = {};

        // Add filters, remove any empty values
        if (form.name && form.name.trim()) filters.name = form.name.trim();
        if (form.hasStock !== null) filters.hasStock = form.hasStock;
        if (form.category) filters.category = form.category;
        if (form.minPrice !== null) filters.minPrice = form.minPrice;
        if (form.maxPrice !== null) filters.maxPrice = form.maxPrice;

        // Emit the filters
        this.apply.emit(filters);
      });
  }
}
