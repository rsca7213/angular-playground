import { signal } from '@angular/core';
import { FormControl, FormGroup, ValidationErrors } from '@angular/forms';
import { Subscription } from 'rxjs';

export abstract class FormUtils {
  protected loading = signal(false);
  protected submissionError = signal<string | null>(null);
  protected success = signal(false);
  protected request: Subscription | null = null;
  protected abstract readonly form: FormGroup;
  protected abstract readonly formErrorMessages: Record<string, Record<string, string>>;
  protected abstract submitLogic(): Promise<void>;

  protected async submitForm(): Promise<void> {
    // Check that the form is valid before proceeding
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    // Check if already loading to prevent multiple submissions
    if (this.loading()) {
      return;
    }

    // Set loading state to true
    this.loading.set(true);

    // Reset any previous submission error
    this.resetSubmissionError();

    // Execute the submit logic
    await this.submitLogic();

    // Reset loading state after submission (only if no subscription is active)
    if (this.request) {
      this.request.add(() => {
        this.loading.set(false);
      });
    } else {
      this.loading.set(false);
    }
  }

  protected resetForm(): void {
    this.form.reset();
    this.loading.set(false);
  }

  protected resetSubmissionError(): void {
    this.submissionError.set(null);
  }

  protected getFormControlErrors(name: string): string | null {
    // Get the form control for the specified name
    const control = this.form.get(name) as FormControl | null;

    // If no control is found, return null
    if (!control) return null;

    // If the control is valid, return null
    if (control.valid) return null;

    // If the control has not been touched, return null
    if (!control.touched) return null;

    // Find the first error in the control's errors
    const errors: ValidationErrors | null = control.errors;

    if (!errors) return null;

    // Iterate through the errors and return the corresponding error message
    for (const errorKey in errors) {
      if (Object.prototype.hasOwnProperty.call(errors, errorKey)) {
        // Check if the error message exists in the formErrorMessages
        const errorMessage = this.formErrorMessages[name]?.[errorKey];
        if (errorMessage) {
          return errorMessage; // Return the first matching error message
        }
      }
    }

    // If no matching error message is found, return a generic error message
    return 'Invalid input';
  }
}
