import { Component } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { heroHomeSolid, heroQuestionMarkCircleSolid } from '@ng-icons/heroicons/solid';
import { Button } from '../../../shared/ui/button/button';

@Component({
  selector: 'app-not-found',
  imports: [Button, NgIcon],
  templateUrl: './not-found.html',
  providers: [provideIcons({ heroHomeSolid, heroQuestionMarkCircleSolid })]
})
export class NotFound {}
