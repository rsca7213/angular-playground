import { Component, inject } from '@angular/core';
import { FormInput } from '../../../shared/ui/form-input/form-input';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Button } from '../../../shared/ui/button/button';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { heroArrowRightEndOnRectangleSolid, heroLockClosedSolid } from '@ng-icons/heroicons/solid';
import { FormUtils } from '../../../shared/ui/form-utils/form-utils';
import { ApiAuth } from '../../../shared/services/api/auth/api-auth';
import { Alert } from '../../../shared/ui/alert/alert';
import { Router } from '@angular/router';
import { Card } from '../../../shared/ui/card/card';
import { heroCheckCircle, heroExclamationTriangle } from '@ng-icons/heroicons/outline';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [FormInput, Button, ReactiveFormsModule, NgIcon, Alert, Card, NgOptimizedImage],
  templateUrl: './login.html',
  providers: [
    provideIcons({
      heroArrowRightEndOnRectangleSolid,
      heroLockClosedSolid,
      heroExclamationTriangle,
      heroCheckCircle
    })
  ]
})
export class Login extends FormUtils {
  private readonly apiAuth = inject(ApiAuth);
  private readonly router = inject(Router);

  protected readonly form = new FormGroup({
    email: new FormControl<string>('', [Validators.required, Validators.email]),
    password: new FormControl<string>('', [Validators.required, Validators.minLength(10)])
  });

  protected override readonly formErrorMessages = {
    email: {
      required: 'Email is required',
      email: 'Please enter a valid email address'
    },
    password: {
      required: 'Password is required',
      minlength: 'Password must be at least 10 characters long'
    }
  };

  protected override async submitLogic(): Promise<void> {
    // Perform the login operation using the API service
    const result = await this.apiAuth.login({
      email: this.form.value.email!,
      password: this.form.value.password!
    });

    // Check if the result is an error response
    if ('error' in result) {
      this.submissionError.set(result.error.message);
      return;
    }

    // If login is successful, redirect to the home page
    this.success.set(true);
    this.router.navigate(['/']);
  }
}
