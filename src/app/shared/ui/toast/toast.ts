import { Component, input } from '@angular/core';
import { IconButton } from '../icon-button/icon-button';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { heroXMarkSolid } from '@ng-icons/heroicons/solid';
import { TAppColors } from '../../types/colors';

@Component({
  selector: 'app-toast',
  imports: [IconButton, NgIcon],
  templateUrl: './toast.html',
  providers: [provideIcons({ heroXMarkSolid })]
})
export class Toast {
  protected display: boolean = false;
  public readonly message = input.required<string>();
  public readonly color = input.required<TAppColors>();

  public show(): void {
    this.display = true;

    // Automatically hide the toast after 5 seconds
    setTimeout(() => {
      this.hide();
    }, 5000);
  }

  public hide(): void {
    this.display = false;
  }
}
