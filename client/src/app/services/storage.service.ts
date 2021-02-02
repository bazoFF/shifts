import { Injectable } from '@angular/core';
import { IShiftDb } from '../models/shift';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private readonly storageSubject: BehaviorSubject<IShiftDb[]>;

  constructor() {
    const shifts: IShiftDb[] = JSON.parse(window.localStorage.getItem('SHIFTS'));
    this.storageSubject = new BehaviorSubject<IShiftDb[]>(shifts);
    this.storageSubject.subscribe(items => window.localStorage.setItem('SHIFTS', JSON.stringify(items)));
  }

  private get shifts(): IShiftDb[] {
    return this.storageSubject.getValue() ? this.storageSubject.getValue() : [];
  }

  public create(shift: IShiftDb): void {
    this.storageSubject.next([...this.shifts.filter(v => v.id !== shift.id), shift]);
  }

  public read(): IShiftDb[] {
    return this.shifts;
  }

  public update(shift: IShiftDb): void {
    this.shifts.find((item, index) => {
      if (item.id === shift.id) {
        this.shifts[index] = shift;
        this.storageSubject.next(this.shifts);
      }
    });
  }

  public delete(id: number): void {
    this.storageSubject.next(this.shifts.filter(item => item.id !== id));
  }
}
