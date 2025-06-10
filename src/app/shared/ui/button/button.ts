import { booleanAttribute, Component, computed, contentChild, input } from '@angular/core';
import { TAppColors } from '../../types/colors';
import { colorContrast } from '../../constants/color-contrast';
import { RouterLink } from '@angular/router';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { heroArrowPathSolid } from '@ng-icons/heroicons/solid';
import { TButtonType } from '../../types/buttons';
import { TBreakpoint } from '../../types/breakpoints';

@Component({
  selector: 'app-button',
  imports: [RouterLink, NgIcon],
  templateUrl: './button.html',
  providers: [provideIcons({ heroArrowPathSolid })]
})
export class Button {
  // Button configuration properties
  readonly type = input<TButtonType>('button');
  readonly title = input.required<string>();
  readonly color = input.required<TAppColors>();
  readonly redirectTo = input<string | string[] | null>(null);
  readonly full = input(false, { transform: booleanAttribute });
  readonly disabled = input(false, { transform: booleanAttribute });
  readonly loading = input(false, { transform: booleanAttribute });
  readonly limitTitleFromBreakpoint = input<TBreakpoint | null>(null);

  // Content child for icon, allowing to check if an icon is provided
  protected readonly icon = contentChild(NgIcon);
  protected readonly hasIcon = computed(() => {
    return Boolean(this.icon());
  });

  private readonly defaultClasses =
    'rounded-lg text-md py-2 px-3 transition-colors duration-200 cursor-pointer flex items-center justify-center';

  // Auto-generate button classes using an array for better readability
  protected buttonClasses = computed(() => {
    let classes: string[] = [
      ...this.defaultClasses.split(' '),
      `bg-${this.color()}`,
      `text-${this.getTextColor()}`
    ];

    // Determine if button should take up full width
    if (this.full()) {
      classes.push('w-full');
    }

    // Add loading state class
    if (this.loading()) {
      classes.push('opacity-50');
      classes.push('cursor-wait');
      classes = classes.filter((c) => c !== 'cursor-pointer'); // Remove pointer cursor when loading
    }

    // Add disabled state class
    if (this.disabled()) {
      classes.push('opacity-50');
      classes.push('cursor-not-allowed');
      classes = classes.filter((c) => c !== 'cursor-pointer'); // Remove pointer cursor when disabled
    }

    //

    return classes.join(' ');
  });

  private getTextColor = () => colorContrast.get(this.color()) || 'dark';
}
