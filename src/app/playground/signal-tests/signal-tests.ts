import { Component, computed, signal, effect } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  heroArrowPathSolid,
  heroMinusCircleSolid,
  heroPlusCircleSolid,
  heroSignalSolid
} from '@ng-icons/heroicons/solid';
import { Button } from '../../shared/components/button/button';
import { Badge } from '../../shared/components/badge/badge';

@Component({
  selector: 'app-signal-tests',
  imports: [NgIcon, Button, Badge],
  templateUrl: './signal-tests.html',
  providers: [
    provideIcons({ heroSignalSolid, heroPlusCircleSolid, heroMinusCircleSolid, heroArrowPathSolid })
  ]
})
export class SignalTests {
  protected number = signal<number>(0);
  protected double = computed(() => this.number() * 2);
  protected text = computed(() => `Number: ${this.number()}, Double: ${this.double()}`);
  protected numberExceedsLimit = effect(() => {
    if (this.number() >= 10) this.reset();
  });

  protected increment(): void {
    this.number.update((value) => value + 1);
  }

  protected decrement(): void {
    this.number.update((value) => value - 1);
  }

  protected reset(): void {
    this.number.set(0);
  }
}
