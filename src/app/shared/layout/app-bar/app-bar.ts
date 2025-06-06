import { Component, inject, OnInit, signal } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { heroHomeSolid, heroPlaySolid, heroShoppingCartSolid } from '@ng-icons/heroicons/solid';
import { ActivatedRoute, Router } from '@angular/router';
import { Button } from '../../ui/button/button';

@Component({
  selector: 'app-app-bar',
  imports: [NgIcon, Button],
  templateUrl: './app-bar.html',
  viewProviders: [provideIcons({ heroHomeSolid, heroPlaySolid, heroShoppingCartSolid })]
})
export class AppBar implements OnInit {
  private readonly router = inject(Router);
  private readonly activatedRoute = inject(ActivatedRoute);

  protected display = signal<boolean>(false);

  public ngOnInit(): void {
    // Subscribe to NavigationEnd router events (when a redirect or navigation is completed)
    this.router.events.subscribe((event) => {
      if (event.constructor.name === 'NavigationEnd') {
        // Get the current activated route
        const currentRoute = this.activatedRoute.root;

        // Get the route information (data)
        const routeData = currentRoute.firstChild?.snapshot.data;

        // Determine if the route required authentication
        const requiresAuth = routeData?.['needsAuth'] ?? false;

        // If the route requires authentication, display the app bar
        // Otherwise, hide the app bar
        this.display.set(requiresAuth);
      }
    });
  }
}
