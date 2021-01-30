import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CraneTypeEnum } from '../../../../models/crane';
import { FullNameValidator } from '../../../../validators/full-name/full-name.validator';
import { DateTimeValidator } from '../../../../validators/date-time/date-time.validator';
import { StartEndValidator } from '../../../../validators/start-end/start-end.validator';

@Component({
  selector: 'app-shift-create',
  templateUrl: './shift-create.component.html',
  styleUrls: ['./shift-create.component.scss']
})
export class ShiftCreateComponent implements OnInit {
  form: FormGroup;
  craneTypes = CraneTypeEnum;

  constructor(public activeModal: NgbActiveModal, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.buildForm();
  }

  submit() {
    if (this.form.valid) {
      const dto = {
        craneType: this.form.get('craneType').value,
        fullName: this.form.get('fullName').value,
        start: this.form.get('start').value,
        end: this.form.get('end').value,
      };

      // todo: send create request
      console.log(dto);

      this.activeModal.close();
    } else {
      this.form.markAllAsTouched();
    }
  }

  private buildForm() {
    this.form = this.formBuilder.group({
      craneType: ['', Validators.required],
      fullName: ['', [Validators.required, FullNameValidator.createValidator()]],
      start: ['', [Validators.required, DateTimeValidator.createValidator()]],
    });

    this.form.addControl('end', new FormControl('', [
      Validators.required,
      DateTimeValidator.createValidator(),
      StartEndValidator.createValidator(this.form.get('start'))
    ]));

    this.form.get('start').valueChanges.subscribe(() => {
      this.form.get('end').updateValueAndValidity();
    });
  }
}
