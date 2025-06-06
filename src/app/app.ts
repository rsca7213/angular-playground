import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AppBar } from './shared/layout/app-bar/app-bar';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, AppBar],
  templateUrl: './app.html'
})
export class App {}
