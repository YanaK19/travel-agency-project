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

export interface Route{
  fromCountry: string;
  fromTown: string;
  toCountry: string;
  toTown: string;
}

export interface Date {
  day: number;
  month: number;
  year: number;
}

export interface Dates {
  dateFrom: Date;
  dateTo: Date;
}

export interface Tour{
  _id?: string;
  title: string;
  restType: string[];
  transportType: string;
  cost: number;
  route: Route;
  moreInfo: string;
  images?: string[];
  dates: Dates[];
  discount: number;
  bookedMax: number;
  booked: number;
  views: number;
}

