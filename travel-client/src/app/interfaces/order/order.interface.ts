import {OrderDate} from './orderDate.interface';

export interface Order {
  _id?: string;
  tourId: string;
  userId: string
  cost: number;
  peopleNumber: number;
  date: OrderDate;
  confirmed: boolean;
}
