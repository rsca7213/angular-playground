import { Component, inject, OnInit } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  heroArrowLeftSolid,
  heroHomeSolid,
  heroQuestionMarkCircleSolid
} from '@ng-icons/heroicons/solid';
import { Button } from '../../../shared/ui/button/button';
import { RouterState } from '../../../shared/services/state/router-state';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-not-found',
  imports: [Button, NgIcon, RouterLink],
  templateUrl: './not-found.html',
  providers: [provideIcons({ heroHomeSolid, heroQuestionMarkCircleSolid, heroArrowLeftSolid })]
})
export class NotFound implements OnInit {
  private readonly routerState = inject(RouterState);
  protected previousUrl: string | null = null;

  public ngOnInit(): void {
    this.previousUrl = this.routerState.getPreviousUrl();
  }
}
