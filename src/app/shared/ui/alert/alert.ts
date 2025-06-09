import { booleanAttribute, Component, input, output } from '@angular/core';
import { TAppColors } from '../../types/colors';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { heroXMarkSolid } from '@ng-icons/heroicons/solid';
import { IconButton } from '../icon-button/icon-button';

@Component({
  selector: 'app-alert',
  imports: [NgIcon, IconButton],
  templateUrl: './alert.html',
  providers: [provideIcons({ heroXMarkSolid })]
})
export class Alert {
  public readonly message = input.required<string>();
  public readonly color = input.required<TAppColors>();
  public readonly dismissible = input(true, { transform: booleanAttribute });

  // Output events
  public readonly dismissed = output<void>();

  protected dismiss(): void {
    this.dismissed.emit();
  }
}
