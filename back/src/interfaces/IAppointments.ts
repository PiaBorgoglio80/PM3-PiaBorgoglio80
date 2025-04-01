export enum Status {
  Active = "active",
  Cancelled = "cancelled",
}
export interface IAppointment {
    id: number;
    date: Date;
    time: string;
    userId: number;    
    status: Status;
    // description: string;
  }

  












