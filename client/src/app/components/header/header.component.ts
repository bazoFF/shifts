import { Component, OnInit } from '@angular/core';
import {NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {ShiftCreateComponent} from '../shift-create/shift-create.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  modalRef: NgbModalRef;

  constructor(private modalService: NgbModal) { }

  ngOnInit() {
    // todo: delete
    this.openShiftCreate();
  }

  openShiftCreate(): void {
    this.modalRef = this.modalService.open(ShiftCreateComponent, {scrollable: true, centered: true, size: 'xl'});
    this.modalRef.result.then((dto) => {
      console.log(dto);
    }, () => {});
  }
}
