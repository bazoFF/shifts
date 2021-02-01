export interface IShift {
    craneType: string;
    fullName: string;
    startDate: Date;
    endDate: Date;
    works: IShiftWork[];
}

export interface IShiftWork {
    crane: number;
    track: number;
    loaded: number;
    unloaded: number;
}

export interface IShiftDb extends IShift {
    id: number;
}

export interface IShiftListItem extends IShiftDb {
    totalLoaded: number;
}


