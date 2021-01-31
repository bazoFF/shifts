import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { IShiftDb } from '../models/shift';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {

  constructor(private storageService: StorageService) { }

  createDb() {
    // const data: IShiftDb[] = [];
    //
    // for (let i = 0; i < 5; i++) {
    //   data.push({
    //     id: i + 1,
    //     craneType: 'Двойной',
    //     fullName: 'Базов Р.В.',
    //     startDate: new Date('01/01/2021 08:00'),
    //     endDate: new Date('01/01/2021 19:30'),
    //     works: [{
    //       craneType: 'Двойной',
    //       loaded: 150,
    //       unloaded: 0
    //     }],
    //   });
    // }
    //
    // return { shifts: data };

    return { shifts: this.storageService.read() };
  }



  genId(entities: IShiftDb[]): number {
    return entities.length > 0 ? Math.max(...entities.map(shift => shift.id)) + 1 : 1;
  }
}
