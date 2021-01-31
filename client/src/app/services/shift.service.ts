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
export class ShiftService {
  private shiftsUrl = 'api/shifts';

  constructor(private http: HttpClient, private storageService: StorageService) { }

  create(dto: IShift): Observable<IShiftDb> {
    return this.http.post<IShiftDb>(`${this.shiftsUrl}`, dto).pipe(
        tap((shift) => this.storageService.create({
          ...shift,
          id: shift.id
        }))
    );
  }

  read(): Observable<IShiftListItem[]> {
    return this.http.get<IShiftDb[]>(`${this.shiftsUrl}`).pipe(
        map(items => items.map(item => ShiftMapper.mapToShiftListItem(item)))
    );
  }

  update(dto: IShiftDb): Observable<void> {
    return this.http.put<void>(`${this.shiftsUrl}/${dto.id}`, dto).pipe(
        tap(() => this.storageService.update(dto))
    );
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.shiftsUrl}/${id}`).pipe(
        tap(() => this.storageService.delete(id))
    );
  }
}
