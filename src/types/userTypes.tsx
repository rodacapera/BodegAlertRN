import {Logos} from './imageTypes';
import {location} from '../assets/images';

export interface User {
  address: string;
  administrator: boolean;
  alias: string;
  avatar: string;
  city: string;
  countryCode: string;
  created: string;
  date: string;
  departament: string;
  devices: Array<null[]>;
  email: string;
  lastname: string;
  location: Location;
  name: string;
  pay: boolean;
  phone: string;
  shop: string;
  type: string;
  user_uid: string;
  zipcode: number;
}

export interface Location {
  lat: number;
  lng: number;
}

export interface Panics {
  alias: string;
  body: string;
  countryCode: string;
  created: string;
  expiration_time: string;
  my_location: Location;
  name: string;
  phone: string;
  title: string;
  zip_code: string;
}

export interface Buttons {
  body: string;
  cost: number;
  date: string;
  name: string;
  reference: string;
  shop: string;
  uid: string;
}

export interface Images {
  path: string;
}

export interface UseGetUser {
  user: User;
  panics: Panics;
  employees: User[];
  counterEmployees: number;
  images: Logos[];
  isLoading: boolean;
  error: boolean;
  buttons: Buttons[];
  counterButtons: number;
}

export interface Shop {
  address: string;
  alias: string;
  countryCode: string;
  location: Location;
  nit: string;
  phone: string;
  zipcode: string;
}

export type DataKey =
  | 'address'
  | 'administrator'
  | 'alias'
  | 'avatar'
  | 'city'
  | 'countryCode'
  | 'created'
  | 'date'
  | 'departament'
  | 'devices'
  | 'email'
  | 'lastname'
  | 'location'
  | 'name'
  | 'pay'
  | 'phone'
  | 'shop'
  | 'type'
  | 'user_uid'
  | 'zipcode';
