import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IShiftListItem } from '../../../../models/shift';

@Component({
  selector: 'app-shifts-list',
  templateUrl: './shifts-list.component.html',
  styleUrls: ['./shifts-list.component.scss']
})
export class ShiftsListComponent implements OnInit {
  @Input() shifts: IShiftListItem[];

  @Output() edit: EventEmitter<IShiftListItem> = new EventEmitter<IShiftListItem>();
  @Output() delete: EventEmitter<number> = new EventEmitter<number>();

  constructor() { }

  ngOnInit() { }
}
