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
