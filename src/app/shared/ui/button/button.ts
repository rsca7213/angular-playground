import { Component, computed, input } from '@angular/core';
import { TAppColors } from '../../types/colors';
import { colorContrast } from '../../constants/color-contrast';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-button',
  imports: [RouterLink],
  templateUrl: './button.html'
})
export class Button {
  readonly defaultClasses =
    'rounded-lg text-md py-2 px-3 transition-colors duration-200 cursor-pointer';
  readonly title = input.required<string>();
  readonly color = input.required<TAppColors>();
  readonly redirectTo = input<string | string[] | null>(null);

  // Auto-generate button classes
  protected buttonClasses = computed(
    () => `bg-${this.color()} text-${this.getTextColor()} ${this.defaultClasses}`
  );

  private getTextColor = () => colorContrast.get(this.color()) || 'dark';
}
