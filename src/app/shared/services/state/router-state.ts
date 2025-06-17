import { inject, Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RouterState {
  private readonly router = inject(Router);
  private previousUrl: string | null = null;
  private currentUrl: string | null = null;

  public constructor() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd && this.currentUrl !== event.urlAfterRedirects) {
        if (this.currentUrl === null) {
          this.currentUrl = event.urlAfterRedirects;
          return;
        }

        this.previousUrl = event.urlAfterRedirects;
      }
    });
  }

  public getPreviousUrl(): string | null {
    return this.previousUrl;
  }
}
