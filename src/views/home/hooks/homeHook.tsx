import {getCurrentPosition} from '@src/hooks/locations/permissionsHook';
import {useGetUser} from '@src/hooks/user/useGetUser';
import {useEffect, useState} from 'react';
import {Region} from 'react-native-maps';

const homeHook = () => {
  const {user, panics} = useGetUser();
  const [region, setRegion] = useState<Region>();

  const animateCamera = async (mapRef: any, region: Region, speed: number) => {
    const camera = await mapRef.current.getCamera();
    // camera.heading += 40;
    // camera.pitch += 100;
    camera.zoom += camera.zoom < 15.5 ? 1 : 0;
    camera.center = {latitude: region.latitude, longitude: region.longitude};
    mapRef.current.animateCamera(camera, {duration: speed});
  };

  const getMyLocation = async () => {
    const location = await getCurrentPosition();
    return {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      latitudeDelta: 0.015,
      longitudeDelta: 0.0121
    };
  };

  const shopLocation = {
    latitude: user?.location.lat!,
    longitude: user?.location.lng!,
    latitudeDelta: 0.015,
    longitudeDelta: 0.0121
  };

  const setMyCurrentLocation = () => setRegion(shopLocation);

  useEffect(() => {
    if (user) {
      setMyCurrentLocation();
    }
  }, [user]);

  return {region, setRegion, animateCamera, getMyLocation, panics, user};
};

export {homeHook};
