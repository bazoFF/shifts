import { FormControl } from '@angular/forms';
import { FullNameValidator } from './full-name.validator';

describe('Validator: FullName', () => {
  let control: FormControl;

  beforeEach(() => {
    control = new FormControl('', FullNameValidator.createValidator());
  });

  it('validate alone string', () => {
    control.setValue('Bazov');
    expect(control.valid).toBeFalsy();
  });

  it('validate full-name 1', () => {
    control.setValue('Bazov Roman Valerevich');
    expect(control.valid).toBeTruthy();
  });

  it('validate full-name 2', () => {
    control.setValue('Bazov R V');
    expect(control.valid).toBeTruthy();
  });

  it('validate full-name 3', () => {
    control.setValue('Bazov R. V.');
    expect(control.valid).toBeTruthy();
  });

  it('validate full-name 4', () => {
    control.setValue('Bazov R.V.');
    expect(control.valid).toBeTruthy();
  });

  it('validate integer', () => {
    control.setValue('55555');
    expect(control.valid).toBeFalsy();
  });

  it('validate empty', () => {
    control.setValue('');
    expect(control.valid).toBeTruthy();
  });
});
