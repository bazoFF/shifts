import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IShift, IShiftDb, IShiftListItem } from '../models/shift';
import { map, tap } from 'rxjs/operators';
import { ShiftMapper } from '../mappers/shift.mapper';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class ShiftService { // HTTP сервис (эмуляция работы с API)
  private shiftsUrl = 'api/shifts';

  constructor(private http: HttpClient, private storageService: StorageService) { }

  create(dto: IShift): Observable<IShiftDb> { // добавление новой смены
    return this.http.post<IShiftDb>(`${this.shiftsUrl}`, dto).pipe(
        tap((shift) => this.storageService.create({ // сохраняем изменения в localStorage
          ...shift,
          id: shift.id
        }))
    );
  }

  read(): Observable<IShiftListItem[]> { // получение смен
    return this.http.get<IShiftDb[]>(`${this.shiftsUrl}`).pipe(
        map(items => items.map(item => ShiftMapper.mapToShiftListItem(item))) // делаем маппинг в нужную структуру данных
    );
  }

  update(dto: IShiftDb): Observable<void> { // изменения смены
    return this.http.put<void>(`${this.shiftsUrl}/${dto.id}`, dto).pipe(
        tap(() => this.storageService.update(dto)) // сохраняем изменения в localStorage
    );
  }

  delete(id: number): Observable<void> { // удаление смены
    return this.http.delete<void>(`${this.shiftsUrl}/${id}`).pipe(
        tap(() => this.storageService.delete(id)) // сохраняем изменения в localStorage
    );
  }
}
