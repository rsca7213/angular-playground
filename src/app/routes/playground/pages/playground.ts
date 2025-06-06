import { Component } from '@angular/core';
import { SignalTests } from '../ui/signal-tests/signal-tests';

@Component({
  selector: 'app-playground',
  imports: [SignalTests],
  templateUrl: './playground.html'
})
export class Playground {}
