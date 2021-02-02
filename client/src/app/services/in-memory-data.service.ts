import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { IShiftDb } from '../models/shift';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService { // Сервис для хранения данных in-memory

  constructor(private storageService: StorageService) { }

  createDb() {
    return { shifts: this.storageService.read() }; // Берем данные из localStorage
  }

  genId(entities: IShiftDb[]): number { // Генерируем id для сущности (находим максимальное значение id и прибавляем 1)
    return entities.length > 0 ? Math.max(...entities.map(shift => shift.id)) + 1 : 1;
  }
}
