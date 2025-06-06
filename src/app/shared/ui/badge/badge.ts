import { Component, computed, input } from '@angular/core';
import { appColors } from '../../types/colors';
import { colorContrast } from '../../constants/color-contrast';

@Component({
  selector: 'app-badge',
  imports: [],
  templateUrl: './badge.html'
})
export class Badge {
  public readonly text = input.required<string>();
  public readonly color = input.required<appColors>();

  // Auto-generate classes
  protected classes = computed(() => `bg-${this.color()} text-${this.getTextColor()}`);
  private getTextColor = () => colorContrast.get(this.color()) || 'dark';
}
