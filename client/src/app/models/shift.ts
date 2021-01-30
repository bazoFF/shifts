export interface IShift {
    craneType: string;
    fullName: string;
    startDate: string;
    endDate: string;
    works: IShiftWork[];
}

export interface IShiftWork {
    craneType: string;
    loaded: number;
    unloaded: number;
}

export interface IShiftDb extends IShift {
    id: number;
}

export interface IShiftListItem extends IShiftDb {
    totalLoaded: number;
}


