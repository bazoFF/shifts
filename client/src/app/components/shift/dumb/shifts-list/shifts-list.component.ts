import { Component, OnInit } from '@angular/core';
import { ShiftService } from '../../../../services/shift.service';
import { IShiftListItem } from '../../../../models/shift';

@Component({
  selector: 'app-shifts-list',
  templateUrl: './shifts-list.component.html',
  styleUrls: ['./shifts-list.component.scss']
})
export class ShiftsListComponent implements OnInit {
  shifts: IShiftListItem[];

  constructor(private shiftsService: ShiftService) { }

  ngOnInit() {
    this.load();
  }

  load() {
    this.shiftsService.getAll().subscribe((shifts) => {
      this.shifts = shifts;
    });
  }

  edit(id: number) {
    console.log('Open edit ID: ' + id);
  }

  delete(id: number) {
    this.shiftsService.delete(id).subscribe(() => {
      this.load();
    });
  }
}
