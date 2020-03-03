import {TourRoute} from './tourRoute.interface';
import {TourDates} from './tourDates.interface';

export interface Tour {
  _id?: string;
  title: string;
  restType: string[];
  transportType: string;
  cost: number;
  route: TourRoute;
  moreInfo: string;
  images?: string[];
  dates: TourDates[];
  discount: number;
  bookedMax: number;
  booked: number;
  views: number;
}

/*export interface Tour{
{
  title: {type: String},
  restType: {type: [String]},
  transportType: {type: String},
  cost: {type: Number},
  route: {
    fromCountry: {type: String},
    fromTown: {type: String},
    toCountry: {type: String},
    toTown: {type: String}
  },
  moreInfo: {type: String},
  images: {
    type: [String],
    default: ''
  },
  dates: [{
    dateFrom: {
      day: {type: Number},
      month: {type: Number},
      year: {type: Number}
    },
    dateTo: {
      day: {type: Number},
      month: {type: Number},
      year: {type: Number}
    }
  }],
  discount: {type: Number, default: 0},
  bookedMax: {type: Number},
  booked: {type: Number},
  views: {type: Number}
}
}*/

