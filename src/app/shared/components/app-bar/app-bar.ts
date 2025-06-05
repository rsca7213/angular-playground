import { Component } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { heroHomeSolid, heroPlaySolid, heroShoppingCartSolid } from '@ng-icons/heroicons/solid';
import { Button } from '../button/button';

@Component({
  selector: 'app-app-bar',
  imports: [NgIcon, Button],
  templateUrl: './app-bar.html',
  viewProviders: [provideIcons({ heroHomeSolid, heroPlaySolid, heroShoppingCartSolid })]
})
export class AppBar {}
