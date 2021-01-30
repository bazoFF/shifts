import { AbstractControl, ValidationErrors } from '@angular/forms';

export class DateTimeValidator {
  static createValidator() {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) {
        return null;
      }

      const dateTime = new Date(control.value);

      return dateTime.toString() === 'Invalid Date' ? { format: true } : null;
    };
  }
}
