import {
  GOOGLE_API_ANDROID,
  GOOGLE_API_IOS
} from '@src/globals/constants/location';
import {ResultLocations} from '@src/types/locationTypes';
import {Platform} from 'react-native';
import Geocoder from 'react-native-geocoding';
import {getCurrentPosition} from './permissionsHook';

export const geocoding = (latLng: Geocoder.fromParams) => {
  Geocoder.init(
    Platform.OS === 'android' ? GOOGLE_API_ANDROID : GOOGLE_API_IOS
  );
  return Geocoder.from(latLng);
};

export const findDataLocation = (
  myCurrentLocation: Geocoder.GeocoderResponse
) => {
  const address = myCurrentLocation.results[0].formatted_address.split(',')[0];
  const state = myCurrentLocation.results[0].address_components.find(
    value => value.types.find(j => j == 'locality') && value
  );
  const city = myCurrentLocation.results[0].address_components.find(
    value => value.types.find(j => j == 'administrative_area_level_2') && value
  );
  const country = myCurrentLocation.results[0].address_components.find(
    value => value.types.find(j => j == 'country') && value
  );

  const zipCode = myCurrentLocation.results[0].address_components.find(
    value => value.types.find(j => j == 'postal_code') && value
  );

  return {address, city, state, country, zipCode} as unknown as ResultLocations;
};

export const getLocation = async (
  setMyCurrentLocation: (e: ResultLocations) => void
) => {
  const myPosition = await getCurrentPosition();

  const latLng = {
    latitude: myPosition.coords.latitude,
    longitude: myPosition.coords.longitude
  };

  const getGeocoding = await geocoding(latLng);
  const getMyCurrentLocation = findDataLocation(getGeocoding);

  setMyCurrentLocation(getMyCurrentLocation);
};
