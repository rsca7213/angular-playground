import { PipeTransform } from '@angular/core';

export interface ITableConfig<T> {
  columns: {
    name: keyof T;
    label: string;
    align?: 'left' | 'right' | 'center';
    applyPipes?: PipeTransform[];
  }[];
  displayIndexColumn?: boolean;
  indexFrom?: number;
  actions: {
    view: boolean;
    update: boolean;
    delete: boolean;
  };
  defaultErrorMessage?: string;
}
