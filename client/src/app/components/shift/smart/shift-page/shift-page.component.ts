import { Component, OnInit } from '@angular/core';
import { ShiftCreateComponent } from '../shift-create/shift-create.component';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ShiftService } from '../../../../services/shift.service';
import { IShiftListItem } from '../../../../models/shift';

@Component({
  selector: 'app-shift-page',
  templateUrl: './shift-page.component.html',
  styleUrls: ['./shift-page.component.scss']
})
export class ShiftPageComponent implements OnInit {
  shifts: IShiftListItem[];
  modalRef: NgbModalRef;
  loading: boolean;

  constructor(private modalService: NgbModal, private shiftService: ShiftService) { }

  ngOnInit() {
    this.load();
    this.openShiftCreate();
  }

  load() {
    this.loading = true;
    this.shiftService.getAll().subscribe((shifts) => {
      this.shifts = shifts;
      this.loading = false;
    });
  }

  openShiftCreate(shift: IShiftListItem = null): void {
    this.modalRef = this.modalService.open(ShiftCreateComponent, {scrollable: true, centered: true, size: 'xl'});

    if (shift !== null) {
      this.modalRef.componentInstance.shift = shift;
    }

    this.modalRef.result.then(() => {
      this.load();
    }).catch(() => { });
  }

  // edit(id: number) {
  //   console.log('Open edit ID: ' + id);
  // }

  delete(id: number) {
    this.shiftService.delete(id).subscribe(() => {
      this.load();
    });
  }
}
