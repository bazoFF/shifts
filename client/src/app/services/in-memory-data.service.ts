import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { IShift, IShiftDb } from '../models/shift';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {

  constructor() { }

  createDb() {
    const data: IShift[] = [];

    for (let i = 0; i < 5; i++) {
      data.push({
        craneType: 'Двойной',
        fullName: 'Базов Р.В.',
        startDate: '01/01/2021 08:00',
        endDate: '01/01/2021 19:30',
        works: [{
          craneType: 'Двойной',
          loaded: 150,
          unloaded: 0
        }],
      });
    }

    return { shifts: data };
  }

  genId(entities: IShiftDb[]): number {
    return entities.length > 0 ? Math.max(...entities.map(shift => shift.id)) + 1 : 1;
  }
}
