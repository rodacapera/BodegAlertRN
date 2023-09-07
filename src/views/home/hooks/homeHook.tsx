import {getMyCurrentPosition} from '@src/hooks/locations/permissionsHook';
import {Region} from 'react-native-maps';

export const getMyLocation = async () => {
  const location = await getMyCurrentPosition;
  return {
    latitude: location.latitude,
    longitude: location.longitude,
    latitudeDelta: 0.015,
    longitudeDelta: 0.0121
  };
};

export const animateCamera = async (
  mapRef: any,
  region: Region,
  speed: number
) => {
  const camera = await mapRef.current.getCamera();
  // camera.heading += 40;
  // camera.pitch += 100;
  camera.zoom += camera.zoom < 15.5 ? 1 : 0;
  camera.center = {latitude: region.latitude, longitude: region.longitude};
  mapRef.current.animateCamera(camera, {duration: speed});
};
