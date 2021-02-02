export interface IShift { // структура смены
    craneType: string;
    fullName: string;
    startDate: Date;
    endDate: Date;
    works: IShiftWork[];
}

export interface IShiftWork { // структура выполненной работы
    crane: number;
    track: number;
    loaded: number;
    unloaded: number;
}

export interface IShiftDb extends IShift { // структура сущности в бд
    id: number;
}

export interface IShiftListItem extends IShiftDb { // структура для отображения смены в списке
    totalLoaded: number;
}


