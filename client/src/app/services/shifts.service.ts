import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';

@Injectable({
  providedIn: 'root'
})
export class ShiftsService implements InMemoryDbService {

  constructor() { }

  createDb() {
    return {};
  }
}
