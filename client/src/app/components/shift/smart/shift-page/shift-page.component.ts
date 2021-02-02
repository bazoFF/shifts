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
  shifts: IShiftListItem[] = [];
  modalRef: NgbModalRef;
  loading: boolean;
  initiating: boolean;

  constructor(private modalService: NgbModal, private shiftService: ShiftService) { }

  ngOnInit() {
    this.initiating = true;
    this.load();
  }

  load() { // загрузка списка смен
    this.loading = true;
    this.shiftService.read().subscribe((shifts) => {
      this.shifts = shifts;

      this.loading = false;
      this.initiating = false;
    });
  }

  openShiftCreate(shift: IShiftListItem = null): void { // открытие компонента добавления смены в модальном окне
    this.modalRef = this.modalService.open(ShiftCreateComponent, {centered: true, size: 'xl'});

    if (shift !== null) {
      this.modalRef.componentInstance.shift = shift; // устанавливаем смену для её изменения, если она имеется
    }

    this.modalRef.result.then(() => { // после результирующего события в модальном окне перезагружаем список смен
      this.load();
    }).catch(() => { });
  }

  edit(shift: IShiftListItem) { // открытие компонента изменения смены в модальном окне
    this.openShiftCreate(shift);
  }

  delete(id: number) { // удаление смены
    this.loading = true;
    this.shiftService.delete(id).subscribe(() => {
      this.load();
    });
  }
}
