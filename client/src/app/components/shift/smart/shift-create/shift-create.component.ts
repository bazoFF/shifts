import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CraneTypeEnum } from '../../../../models/crane';
import { FullNameValidator } from '../../../../validators/full-name/full-name.validator';
import { DateTimeValidator } from '../../../../validators/date-time/date-time.validator';
import { StartEndValidator } from '../../../../validators/start-end/start-end.validator';
import { ShiftService } from '../../../../services/shift.service';
import { IShift, IShiftListItem } from '../../../../models/shift';

@Component({
  selector: 'app-shift-create',
  templateUrl: './shift-create.component.html',
  styleUrls: ['./shift-create.component.scss']
})
export class ShiftCreateComponent implements OnInit {
  form: FormGroup;
  craneTypes = CraneTypeEnum;
  shift: IShiftListItem = null;

  constructor(
      public activeModal: NgbActiveModal,
      private formBuilder: FormBuilder,
      private shiftService: ShiftService
  ) { }

  ngOnInit() {
    this.buildForm();

    if (this.shift) {
      this.bindForm();
    }
  }

  async submit() {
    if (this.form.valid) {
      const dto: IShift = {
        craneType: this.form.get('craneType').value,
        fullName: this.form.get('fullName').value,
        startDate: this.form.get('startDate').value,
        endDate: this.form.get('endDate').value,
        works: []
      };

      await this.shiftService.create(dto).toPromise();
      this.activeModal.close();
    } else {
      this.form.markAllAsTouched();
    }
  }

  private buildForm() {
    this.form = this.formBuilder.group({
      craneType: ['', Validators.required],
      fullName: ['', [Validators.required, FullNameValidator.createValidator()]],
      startDate: ['', [Validators.required, DateTimeValidator.createValidator()]],
    });

    this.form.addControl('endDate', new FormControl('', [
      Validators.required,
      DateTimeValidator.createValidator(),
      StartEndValidator.createValidator(this.form.get('startDate'))
    ]));

    this.form.get('startDate').valueChanges.subscribe((v) => {
      console.log(v);
      this.form.get('endDate').updateValueAndValidity();
    });
  }

  private bindForm() {
    this.form.get('craneType').setValue(this.shift.craneType);
    this.form.get('craneType').disable();
    this.form.get('fullName').setValue(this.shift.fullName);
    this.form.get('startDate').setValue(this.shift.startDate);
    this.form.get('endDate').setValue(this.shift.endDate);
  }
}
