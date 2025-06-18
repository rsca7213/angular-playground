import { Directive, effect, inject, TemplateRef, ViewContainerRef } from '@angular/core';
import { AuthState } from '../services/state/auth-state';

@Directive({
  selector: '[appIsAuthenticated]'
})
export class IsAuthenticated {
  private readonly viewContainer = inject(ViewContainerRef);
  private readonly templateRef = inject(TemplateRef);
  private readonly authState = inject(AuthState);

  public constructor() {
    effect(() => {
      const isAuthenticated = this.authState.isUserAuthenticated();

      if (isAuthenticated) {
        this.viewContainer.createEmbeddedView(this.templateRef);
      } else {
        this.viewContainer.clear();
      }
    });
  }
}
