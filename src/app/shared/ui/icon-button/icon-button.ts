import { Component, input } from '@angular/core';
import { TAppColors } from '../../types/colors';

@Component({
  selector: 'app-icon-button',
  imports: [],
  templateUrl: './icon-button.html'
})
export class IconButton {
  public readonly color = input.required<TAppColors>();
}
