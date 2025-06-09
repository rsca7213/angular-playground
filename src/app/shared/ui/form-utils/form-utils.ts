import { signal } from '@angular/core';
import { FormGroup } from '@angular/forms';

export abstract class FormUtils {
  protected loading = signal(false);
  protected submissionError = signal<string | null>(null);
  protected abstract readonly form: FormGroup;
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

    // Reset loading state after submission
    this.loading.set(false);
  }

  protected resetForm(): void {
    this.form.reset();
    this.loading.set(false);
  }

  protected resetSubmissionError(): void {
    this.submissionError.set(null);
  }
}
