import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IShift, IShiftDb, IShiftListItem } from '../models/shift';
import { map } from 'rxjs/operators';
import { ShiftMapper } from '../mappers/shift.mapper';

@Injectable({
  providedIn: 'root'
})
export class ShiftService {
  private shiftsUrl = 'api/shifts';

  constructor(private http: HttpClient) { }

  create(shift: IShift): Observable<void> {
    return this.http.post<void>(`${this.shiftsUrl}`, shift);
  }

  getAll(): Observable<IShiftListItem[]> {
    return this.http.get<IShiftDb[]>(`${this.shiftsUrl}`).pipe(
        map(items => items.map(item => ShiftMapper.mapToShiftListItem(item)))
    );
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.shiftsUrl}/${id}`);
  }
}
