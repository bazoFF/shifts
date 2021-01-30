import { AbstractControl, ValidationErrors } from '@angular/forms';

export class FullNameValidator {
  static createValidator() {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) {
        return null;
      }

      const lastName = '([A-Z]|[А-Я])[a-zа-я]+';
      const firstName = '([A-Z]|[А-Я])([a-zа-я]+|\\.|\\s)';
      const secondName = '([A-Z]|[А-Я])([a-zа-я]+|\\.)?';
      const pattern = `${lastName}\\s+${firstName}\\s*${secondName}`;

      return control.value.match(pattern) ? null : { format: true };
    };
  }
}
