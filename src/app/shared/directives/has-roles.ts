import { Directive, effect, inject, input, TemplateRef, ViewContainerRef } from '@angular/core';
import { AuthState } from '../services/state/auth-state';
import { TRole } from '../types/roles';

@Directive({
  selector: '[appHasRoles]'
})
export class HasRoles {
  public readonly roles = input.required<TRole | TRole[]>({
    alias: 'appHasRoles'
  });
  private readonly viewContainer = inject(ViewContainerRef);
  private readonly templateRef = inject(TemplateRef);
  private readonly authState = inject(AuthState);

  public constructor() {
    effect(() => {
      const isAuthenticated = this.authState.isUserAuthenticated();
      const user = this.authState.getAuthUser();

      if (!isAuthenticated || !user) {
        this.viewContainer.clear();
        return;
      }

      const roles = (Array.isArray(this.roles()) ? this.roles() : [this.roles()]) as TRole[];

      const hasRequiredRole = roles.some((role) => user.roleName === role);

      if (hasRequiredRole) {
        this.viewContainer.createEmbeddedView(this.templateRef);
      } else {
        this.viewContainer.clear();
      }
    });
  }
}
