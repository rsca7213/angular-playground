import { Component } from '@angular/core';
import { SignalTests } from '../ui/signal-tests/signal-tests';
import { DialogTests } from '../ui/dialog-tests/dialog-tests';

@Component({
  selector: 'app-playground',
  imports: [SignalTests, DialogTests],
  templateUrl: './playground.html'
})
export class Playground {}
