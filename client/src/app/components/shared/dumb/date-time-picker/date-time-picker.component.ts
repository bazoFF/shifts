import { ChangeDetectorRef, Component, forwardRef, OnInit } from '@angular/core';
import { ControlValueAccessor, FormBuilder, FormGroup, NG_VALUE_ACCESSOR, Validators } from '@angular/forms';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-date-time-picker',
  templateUrl: './date-time-picker.component.html',
  styleUrls: ['./date-time-picker.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DateTimePickerComponent),
      multi: true
    }
  ]
})
export class DateTimePickerComponent implements OnInit, ControlValueAccessor {
  form: FormGroup;
  value: Date;
  picking: boolean = false;

  constructor(private formBuilder: FormBuilder, private cdRef: ChangeDetectorRef) { }

  ngOnInit() {
    this.buildForm();
  }

  togglePicker() {
    this.picking = !this.picking;
  }

  writeValue(value?: string) {
    if (value) {
      this.value = new Date(value);
      this.form.get('date').setValue(new NgbDate(
          this.value.getFullYear(),
          this.value.getMonth() + 1,
          this.value.getDate()
      ));
      this.form.get('time').setValue({
        hour: this.value.getHours(),
        minute: this.value.getMinutes(),
        second: 0
      });
    }

    this._onChange(this.value);
  }

  registerOnChange(fn: any): void {
    this._onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this._onTouched = fn;
  }

  private buildForm() {
    this.form = this.formBuilder.group({
      date: [null, Validators.required],
      time: [null, Validators.required]
    });

    this.subscribeToChanges();
  }

  private subscribeToChanges() {
    this.form.get('date').valueChanges.subscribe(date => {
      if (!this.value) {
        this.value = new Date();
      }

      this.value.setDate(date ? date.day : null);
      this.value.setMonth(date ? date.month - 1 : null);
      this.value.setFullYear(date ? date.year : null);

      this.cdRef.detectChanges();
      this._onChange(this.value);
    });

    this.form.get('time').valueChanges.subscribe(time => {
      if (!this.value) {
        this.value = new Date();
      }

      this.value.setHours(time ? time.hour : null);
      this.value.setMinutes(time ? time.minute : null, 0);

      this.cdRef.detectChanges();
      this._onChange(this.value);
    });
  }

  private _onTouched = () => {
    //
  }

  private _onChange = (result: Date) => {
    //
  }
}
