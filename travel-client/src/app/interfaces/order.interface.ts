export interface Date {
  day: number;
  month: number;
  year: number;
}

export interface Order{
  _id?: string;
  tourId: string;
  cost: number;
  peopleNumber: number;
  date: Date;
  confirmed: boolean;
}
