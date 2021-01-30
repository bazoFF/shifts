import { AbstractControl, ValidationErrors } from '@angular/forms';

export class StartEndValidator {
  static createValidator(startControl: AbstractControl) {
    return (endControl: AbstractControl): ValidationErrors | null => {
      if (!startControl.value || !endControl.value) {
        return null;
      }

      const start = new Date(startControl.value);
      const end = new Date(endControl.value);

      if (start.toString() === 'Invalid Date' || end.toString() === 'Invalid Date') {
        return null;
      }

      return start < end ? null : { startEnd: true };
    };
  }
}
