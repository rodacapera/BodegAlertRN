import {
  SERVER_PANIC_API_PUSH,
  SERVER_PANIC_URL_PATH
} from '@src/globals/constants/panicService';
import {SendNotificationProps} from '@src/types/panicTypes';
import {getAxios} from '../axios';
import * as geolib from 'geolib';
import {GeolibInputCoordinates} from 'geolib/es/types';
import {getCurrentPosition} from '../locations/permissionsHook';
import {t} from 'i18next';
import {NavigationProp} from '@react-navigation/native';
import {headerShown} from '../navigator/headerShown';
import {StackNavigation} from '@src/types/globalTypes';

const url = `${SERVER_PANIC_URL_PATH}${SERVER_PANIC_API_PUSH}`;

const sendNotification = async ({
  data,
  setLoading,
  navigation
}: SendNotificationProps) => {
  setLoading(true);
  headerShown({navigation, visible: false, transparent: true});
  const response = await getAxios.post(url, data);
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
  navigation: StackNavigation
) => {
  const currentPosition = await getCurrentPosition();
  console.log('currentPosition', currentPosition);
  const validDistance = 100;
  const user = 'user';
  const latLng = {
    lat: currentPosition.coords.latitude,
    lng: currentPosition.coords.longitude
  };
  const data = {
    title: `${user} ${t('notifications.title')}`,
    body: t('notifications.body'),
    my_location: latLng,
    name: user,
    phone: '3102712547',
    alias: 'FerreConsumo',
    zip_code: '110800',
    countryCode: 'CO'
  };
  const registerPosition = {latitude: 4.441517, longitude: -75.191001};

  const distance = getDistanceBetween(registerPosition, latLng);
  console.log('isValid', distance);
  if (distance < validDistance) {
    sendNotification({data, setLoading, navigation});
    setErrorDistance(false);
  } else {
    setErrorDistance(true);
  }
};
