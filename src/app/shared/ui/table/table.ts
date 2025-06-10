import { Component, input, InputSignal } from '@angular/core';
import { ITableConfig } from '../../interfaces/ui/table';
import { IconButton } from '../icon-button/icon-button';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  heroArrowPathSolid,
  heroExclamationTriangleSolid,
  heroEyeSolid,
  heroNoSymbolSolid,
  heroPencilSolid,
  heroTrashSolid
} from '@ng-icons/heroicons/solid';

export const provideTableIcons = () =>
  provideIcons({
    heroEyeSolid,
    heroPencilSolid,
    heroTrashSolid,
    heroArrowPathSolid,
    heroExclamationTriangleSolid,
    heroNoSymbolSolid
  });

export const provideTableImports = [IconButton, NgIcon];

@Component({
  selector: 'app-table',
  imports: provideTableImports,
  templateUrl: './table.html',
  providers: [provideTableIcons()]
})
export abstract class Table<T extends { id: string }> {
  public abstract readonly data: InputSignal<T[]>;
  public abstract readonly config: ITableConfig<T>;
  public readonly loading = input<boolean>(false);
  public readonly errorMessage = input<string | null>(null);

  protected applyPipes(column: ITableConfig<T>['columns'][number], value: unknown): unknown {
    let result = value;

    if (!column.applyPipes?.length) return result;

    for (const pipe of column.applyPipes) {
      result = pipe.transform(result);
    }

    return result;
  }

  protected hasActions(): boolean {
    return Object.values(this.config.actions).some((action) => action);
  }
}
