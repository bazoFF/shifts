import { FormControl } from '@angular/forms';
import { DateTimeValidator } from './date-time.validator';

describe('Validator: DateTime', () => {
  let control: FormControl;

  beforeEach(() => {
    control = new FormControl('', DateTimeValidator.createValidator());
  });

  it('validate string', () => {
    control.setValue('str');
    expect(control.valid).toBeFalsy();
  });

  it('validate date time 1', () => {
    control.setValue('01/01/2021 08:00');
    expect(control.valid).toBeTruthy();
  });

  it('validate date time 2', () => {
    control.setValue('01/01/2021 19:00');
    expect(control.valid).toBeTruthy();
  });

  it('validate empty', () => {
    control.setValue('');
    expect(control.valid).toBeTruthy();
  });

  it('validate date time 3', () => {
    control.setValue('2021-01-01T00:00');
    expect(control.valid).toBeTruthy();
  });
});
