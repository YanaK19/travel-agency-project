import {UserLocation} from './userLocation.interface';

export interface UserData {
  _id?: string;
  name: string;
  email: string;
  telephone: string;
  role: string;
  languages?: string[];
  location?: UserLocation;
  about?: string;
  avatar?: string;
  favouriteTourIds?: string[];
}

