import {
  SERVER_PANIC_API_PUSH,
  SERVER_PANIC_URL_PATH
} from '@src/globals/constants/panicService';
import {SendNotificationProps} from '@src/types/panicTypes';
import {getAxios} from '../axios';
import * as geolib from 'geolib';
import {GeolibInputCoordinates} from 'geolib/es/types';
import {getCurrentPosition} from '../locations/permissionsHook';

const url = `${SERVER_PANIC_URL_PATH}${SERVER_PANIC_API_PUSH}`;

const sendNotification = async ({data, setLoading}: SendNotificationProps) => {
  setLoading(true);
  const response = await getAxios.post(url, data);
  if (response.status == 201) {
    setLoading(false);
    return true;
  }
  return false;
};

const validDistance = (
  registerPosition: GeolibInputCoordinates,
  currentPosition: GeolibInputCoordinates
) => {
  const calculate = geolib.getPreciseDistance(
    registerPosition,
    currentPosition
  );
  console.log(calculate);

  return calculate;
};

export const panicNotification = async (setLoading: (e: boolean) => void) => {
  const currentPosition = await getCurrentPosition();
  console.log('currentPosition', currentPosition);

  const data = {
    title: 'hola prueba',
    body: 'mensage prueba',
    my_location: {lat: 4.650263, lng: -74.146984},
    name: 'rhonald',
    phone: '3102712547',
    alias: 'FerreConsumo',
    zip_code: '110800',
    countryCode: 'CO'
  };
  const registerPosition = {latitude: 51.5103, longitude: 7.49347};
  // const currentPosition = {latitude: "51° 31' N", longitude: "7° 28' E"};

  // const isValid = validDistance(registerPosition, currentPosition.);
  sendNotification({data, setLoading});
};
