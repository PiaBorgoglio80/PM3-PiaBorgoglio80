export interface AppointmentRegisterDto{
    date: Date;
    time: string;
    userId: number;
    description: string;
     status: Status.Active
}

export enum Status{
    Active = "active",
    Cancelled = "cancelled"
}