import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CranesEnum, CraneTypeEnum } from '../../../../models/crane';
import { FullNameValidator } from '../../../../validators/full-name/full-name.validator';
import { StartEndValidator } from '../../../../validators/start-end/start-end.validator';
import { ShiftService } from '../../../../services/shift.service';
import { IShift, IShiftListItem, IShiftWork } from '../../../../models/shift';

@Component({
  selector: 'app-shift-create',
  templateUrl: './shift-create.component.html',
  styleUrls: ['./shift-create.component.scss']
})
export class ShiftCreateComponent implements OnInit {
  loading: boolean = false;
  form: FormGroup;
  craneTypes = CraneTypeEnum;
  cranes = CranesEnum;
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

  get totalLoaded() {
    return this.getTotal('loaded');
  }

  get totalUnloaded() {
    return this.getTotal('unloaded');
  }

  private getTotal(type: string) {
    const works = this.form.get('works').value;

    if (works.length === 0) {
      return 0;
    }

    const total = works.map(work => work[type]).reduce((a, b) => a + b);

    return total ? total : 0;
  }

  async submit() {
    if (this.form.valid) {
      const dto: IShift = {
        craneType: this.form.get('craneType').value,
        fullName: this.form.get('fullName').value,
        startDate: this.form.get('startDate').value,
        endDate: this.form.get('endDate').value,
        works: this.form.get('works').value,
      };

      this.loading = true;

      if (this.shift) {
        await this.shiftService.update({ id: this.shift.id, ...dto }).toPromise();
      } else {
        await this.shiftService.create(dto).toPromise();
      }

      this.loading = false;
      this.activeModal.close();
    } else {
      this.form.markAllAsTouched();
    }
  }

  getWorks(crane: number): IShiftWork[] {
    return this.form.get('works').value.filter(work => work.crane === crane);
  }

  setWorks(works: IShiftWork[], crane: number): void {
    // console.log(works, this.form.get('works').value.filter(work => work.crane !== crane));
    this.form.get('works').setValue([
      ...works,
      ...this.form.get('works').value.filter(work => work.crane !== crane)
    ]);
  }

  private buildForm(): void {
    this.form = this.formBuilder.group({
      craneType: ['', Validators.required],
      fullName: ['', [Validators.required, FullNameValidator.createValidator()]],
      startDate: ['', Validators.required],
      works: [[]]
    });

    this.form.addControl('endDate', new FormControl('', StartEndValidator.createValidator(this.form.get('startDate'))));
    this.form.get('startDate').valueChanges.subscribe(() => this.form.get('endDate').updateValueAndValidity());
  }

  private bindForm(): void {
    this.form.patchValue(this.shift);
    this.form.get('craneType').disable();
  }
}
