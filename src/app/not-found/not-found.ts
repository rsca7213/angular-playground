import { Component } from '@angular/core';
import { Button } from '../shared/components/button/button';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { heroHomeSolid, heroQuestionMarkCircleSolid } from '@ng-icons/heroicons/solid';

@Component({
  selector: 'app-not-found',
  imports: [Button, NgIcon],
  templateUrl: './not-found.html',
  providers: [provideIcons({ heroHomeSolid, heroQuestionMarkCircleSolid })]
})
export class NotFound {}
