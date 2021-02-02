import { Injectable } from '@angular/core';
import { IShiftDb, IShiftListItem } from '../models/shift';

@Injectable({
    providedIn: 'root'
})
export class ShiftMapper { // маппер для смен
    static mapToShiftListItem(item: IShiftDb): IShiftListItem { // маппинг в IShiftListItem
        const totalLoaded = item.works.length > 0
            ? item.works.map(w => w.loaded).reduce((a, b) => a + b) // суммирование всех погрузок за смену
            : 0;

        return {
            ...item,
            totalLoaded: totalLoaded ? totalLoaded : 0
        };
    }
}
