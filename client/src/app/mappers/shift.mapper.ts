import { Injectable } from '@angular/core';
import { IShiftDb, IShiftListItem } from '../models/shift';

@Injectable({
    providedIn: 'root'
})
export class ShiftMapper {
    static mapToShiftListItem(item: IShiftDb): IShiftListItem {
        return {
            ...item,
            totalLoaded: item.works.length > 0 ? item.works.map(w => w.loaded).reduce((a, b) => a + b) : 0
        };
    }
}
