import { FormControl } from '@angular/forms';
import { StartEndValidator } from './start-end.validator';

describe('Validator: StartEnd', () => {
  let control: FormControl;
  let compareControl: FormControl;

  beforeEach(() => {
    compareControl = new FormControl('01/01/2021 08:00');
    control = new FormControl('', StartEndValidator.createValidator(compareControl));
  });

  it('validate start end equals', () => {
    control.setValue('01/01/2021 08:00');
    expect(control.valid).toBeFalsy();
  });

  it('validate date time 2', () => {
    control.setValue('01/01/2021 19:00');
    expect(control.valid).toBeTruthy();
  });

  it('validate invalid', () => {
    control.setValue('asd');
    expect(control.valid).toBeTruthy();
  });

  it('validate empty', () => {
    control.setValue('');
    expect(control.valid).toBeTruthy();
  });

  it('validate date time 3', () => {
    control.setValue('2021-03-01T00:00');
    expect(control.valid).toBeTruthy();
  });
});
