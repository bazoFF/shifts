import { Component, Input, OnInit } from '@angular/core';
import { IShiftWork } from '../../../../models/shift';
import { Tracks } from '../../../../models/track';

@Component({
  selector: 'app-shift-work',
  templateUrl: './shift-work.component.html',
  styleUrls: ['./shift-work.component.scss']
})
export class ShiftWorkComponent implements OnInit {
  @Input() header: string;
  @Input() works: IShiftWork[];

  tracks = Tracks;

  constructor() { }

  ngOnInit() {
  }

}
