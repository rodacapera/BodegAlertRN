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
import {MD3Colors} from 'react-native-paper/lib/typescript/src/types';

const url = `${SERVER_PANIC_URL_PATH}${SERVER_PANIC_API_PUSH}`;

const sendNotification = async ({
  data,
  setLoading,
  navigation,
  colors,
  width
}: SendNotificationProps) => {
  setLoading(true);
  headerShown({
    width: width,
    navigation,
    visible: false,
    transparent: true,
    titleColor: colors.onPrimaryContainer
  });
  const response = await getAxios.post(url, data);
  if (response.status == 201) {
    headerShown({
      width: width,
      navigation,
      visible: true,
      transparent: true,
      titleColor: colors.onPrimaryContainer
    });
    setLoading(false);
    return true;
  } else {
    setLoading(false);
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

  return calculate;
};

export const panicNotification = async (
  setLoading: (e: boolean) => void,
  setErrorDistance: (e: boolean) => void,
  navigation: StackNavigation,
  configuration: Configuration,
  user: User,
  colors: MD3Colors,
  width: number
) => {
  const currentPosition = await getCurrentPosition();
  const validDistance = configuration.distance_panic;
  const registerPosition = {
    latitude: user.location.lat!,
    longitude: user.location.lng!,
    latitudeDelta: 0.015,
    longitudeDelta: 0.0121
  };
  const latLng = {
    latitude: currentPosition.coords.latitude,
    longitude: currentPosition.coords.longitude,
    latitudeDelta: 0.015,
    longitudeDelta: 0.0121
  };

  const data = {
    title: t('notifications.title'),
    body: `${user.alias}: ${t('notifications.body')}`,
    my_location: user.type === 'vehicle' ? latLng : registerPosition,
    name: user.name + ' ' + user.lastname,
    phone: user.phone,
    alias: user.alias,
    zip_code: user.zipcode,
    countryCode: user.countryCode,
    city: user.city,
    group_number: user.group_number
  };

  const distance = getDistanceBetween(registerPosition, latLng);
  if (user.pay) {
    if (user.type === 'residence') {
      if (distance < validDistance) {
        sendNotification({data, setLoading, navigation, colors, width});
        setErrorDistance(false);
      } else {
        setErrorDistance(true);
      }
    } else {
      sendNotification({data, setLoading, navigation, colors, width});
      setErrorDistance(false);
    }
  } else {
    setErrorDistance(true);
  }
};
