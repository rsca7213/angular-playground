import { TitleCasePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'deEnum'
})
export class DeEnumPipe implements PipeTransform {
  transform(value: string): unknown {
    if (!value) return value;

    // replace underscores with spaces and convert to lowercase
    value = value.toLowerCase();
    value = value.replace(/_/g, ' ');

    // apply title case transformation pipe
    const titleCasePipe = new TitleCasePipe();
    value = titleCasePipe.transform(value);

    // Return the transformed value
    return value;
  }
}
