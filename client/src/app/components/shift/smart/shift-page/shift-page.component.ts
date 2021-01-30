import { Component, OnInit } from '@angular/core';
import { ShiftCreateComponent } from '../../dumb/shift-create/shift-create.component';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-shift-page',
  templateUrl: './shift-page.component.html',
  styleUrls: ['./shift-page.component.scss']
})
export class ShiftPageComponent implements OnInit {
  modalRef: NgbModalRef;

  constructor(private modalService: NgbModal) { }

  ngOnInit() {
  }

  openShiftCreate(): void {
    this.modalRef = this.modalService.open(ShiftCreateComponent, {scrollable: true, centered: true, size: 'xl'});
  }
}
