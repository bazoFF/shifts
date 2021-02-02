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
    return { shifts: this.storageService.read() };
  }

  genId(entities: IShiftDb[]): number {
    return entities.length > 0 ? Math.max(...entities.map(shift => shift.id)) + 1 : 1;
  }
}
