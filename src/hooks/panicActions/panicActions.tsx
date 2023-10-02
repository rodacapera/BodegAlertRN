import {
  SERVER_PANIC_API_PUSH,
  SERVER_PANIC_URL_PATH
} from '@src/globals/constants/panicService';
import {Configuration} from '@src/types/configuration';
import {StackNavigation} from '@src/types/globalTypes';
import {SendNotificationProps} from '@src/types/panicTypes';
import {User} from '@src/types/userTypes';
import * as geolib from 'geolib';
import {GeolibInputCoordinates} from 'geolib/es/types';
import {t} from 'i18next';
import {getAxios} from '../axios';
import {getCurrentPosition} from '../locations/permissionsHook';
import {headerShown} from '../navigator/headerShown';

const url = `${SERVER_PANIC_URL_PATH}${SERVER_PANIC_API_PUSH}`;

const sendNotification = async ({
  data,
  setLoading,
  navigation
}: SendNotificationProps) => {
  setLoading(true);
  headerShown({navigation, visible: false, transparent: true});
  const response = await getAxios.post(url, data);
  console.log('response', response.data);

  if (response.status == 201) {
    headerShown({navigation, visible: true, transparent: true});
    setLoading(false);
    return true;
  }
  return false;
};

const getDistanceBetween = (
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

export const panicNotification = async (
  setLoading: (e: boolean) => void,
  setErrorDistance: (e: boolean) => void,
  navigation: StackNavigation,
  configuration: Configuration,
  user: User
) => {
  const currentPosition = await getCurrentPosition();
  const validDistance = configuration.distance_panic;
  const registerPosition = {
    lat: user.location.lat,
    lng: user.location.lng
  };
  const latLng = {
    latitude: currentPosition.coords.latitude,
    longitude: currentPosition.coords.longitude
  };

  // const newRegisterPosition = {
  //   lat: 4.443289,
  //   lng: -75.198824
  // };
  const data = {
    title: t('notifications.title'),
    body: `${user.alias}: ${t('notifications.body')}`,
    my_location: registerPosition,
    name: user.name + ' ' + user.lastname,
    phone: user.phone,
    alias: user.alias,
    zip_code: user.zipcode,
    countryCode: user.countryCode
  };

  const distance = getDistanceBetween(registerPosition, latLng);
  if (distance < validDistance) {
    sendNotification({data, setLoading, navigation});
    setErrorDistance(false);
  } else {
    setErrorDistance(true);
  }
};
