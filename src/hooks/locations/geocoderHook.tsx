import {GOOGLE_API_ANDROID} from '@src/globals/constants/location';
import {GetLocationParams, ResultLocations} from '@src/types/locationTypes';
import Geocoder from 'react-native-geocoding';
import {getLocationPermissions} from './permissionsHook';

export const geocoding = (latLng: Geocoder.fromParams) => {
  Geocoder.init(GOOGLE_API_ANDROID);
  return Geocoder.from(latLng);
};

export const getLocation = async (
  setMyCurrentLocation: (e: ResultLocations) => void,
) => {
  const myPosition =
    (await getLocationPermissions()) as unknown as GetLocationParams;

  const latLng = {
    latitude: myPosition.latitude,
    longitude: myPosition.longitude,
  };

  const getGeocoding = await geocoding(latLng);
  const getMyCurrentLocation = findDataLocation(getGeocoding);

  setMyCurrentLocation(getMyCurrentLocation);
};

const findDataLocation = (myCurrentLocation: Geocoder.GeocoderResponse) => {
  const address = myCurrentLocation.results[0].formatted_address.split(',')[0];
  const state = myCurrentLocation.results[0].address_components.find(
    value => value.types.find(j => j == 'locality') && value,
  );
  const city = myCurrentLocation.results[0].address_components.find(
    value => value.types.find(j => j == 'administrative_area_level_2') && value,
  );
  const country = myCurrentLocation.results[0].address_components.find(
    value => value.types.find(j => j == 'country') && value,
  );

  return {address, city, state, country} as unknown as ResultLocations;
};
