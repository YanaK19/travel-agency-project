import {ReviewDate} from './reviewDate.interface';

export interface Review {
  _id?: string;
  title: string;
  info: string;
  img: string;
  date: ReviewDate;
  confirmed: boolean;
  userId: string;
  tourId: string;
}
