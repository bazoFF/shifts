import {
  ChangeDetectorRef,
  Component,
  forwardRef,
  HostBinding,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import { ControlValueAccessor, FormBuilder, FormGroup, NG_VALUE_ACCESSOR } from '@angular/forms';
import { NgbDate, NgbDatepicker } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';

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
export class DateTimePickerComponent implements OnInit, OnChanges, ControlValueAccessor {
  @HostBinding('class.is-invalid') isInvalidClass = false;
  @Input() invalid: boolean = false;

  form: FormGroup;
  value: Date;

  constructor(
      private formBuilder: FormBuilder,
      private datePipe: DatePipe,
      private cdRef: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.buildForm();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.invalid) {
      this.isInvalidClass = changes.invalid.currentValue;
    }
  }

  writeValue(value?: string) {
    if (value) {
      this.value = new Date(value);

      this.form.get('date').setValue(new NgbDate(
          this.value.getFullYear(),
          this.value.getMonth(),
          this.value.getDate()
      ));

      this.form.get('time').setValue({
        hour: this.value.getHours(),
        minute: this.value.getMinutes(),
        second: 0
      });

      this.changeValue();
    }
  }

  registerOnChange(fn: any): void {
    this._onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this._onTouched = fn;
  }

  private buildForm() {
    this.form = this.formBuilder.group({
      date: [null],
      time: [null],
      value: [null]
    });

    this.subscribeToDateChanges();
    this.subscribeToTimeChanges();
  }

  private subscribeToDateChanges() {
    this.form.get('date').valueChanges.subscribe(date => {
      if (!this.value) {
        this.value = new Date();
        this.value.setHours(0, 0, 0);
      }

      this.value.setFullYear(date.year, date.month - 1, date.day);
      this.changeValue();
    });
  }

  private subscribeToTimeChanges() {
    this.form.get('time').valueChanges.subscribe((time) => {
      if (!this.value) {
        this.value = new Date();
      }

      if (!time) {
        time = { hour: 0, minute: 0 };
        this.form.get('time').patchValue(time);
      }

      this.value.setHours(time.hour, time.minute, 0);
      this.changeValue();
    });
  }

  private changeValue() {
    this._onChange(this.value);
    this.form.get('value').setValue(this.datePipe.transform(this.value, 'd/MM/y H:mm'));
    this.cdRef.detectChanges();
  }

  public touch() {
    this._onTouched();
  }

  private _onTouched() { }

  private _onChange(result: Date) { }
}
