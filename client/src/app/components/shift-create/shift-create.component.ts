import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-shift-create',
  templateUrl: './shift-create.component.html',
  styleUrls: ['./shift-create.component.scss']
})
export class ShiftCreateComponent implements OnInit {
  form: FormGroup;

  constructor(public activeModal: NgbActiveModal, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      craneType: [null, Validators.required],
      fullname: [null, Validators.required]
    });

  }

  submit() {
    if (this.form.valid) {
      console.log('DTO');
      this.activeModal.close();
    } else {
      this.form.markAllAsTouched();
    }
  }
}
