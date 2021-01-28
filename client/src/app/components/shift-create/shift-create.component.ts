import { Component, OnInit } from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-shift-create',
  templateUrl: './shift-create.component.html',
  styleUrls: ['./shift-create.component.scss']
})
export class ShiftCreateComponent implements OnInit {

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit() {
  }

}
