import {Configuration} from '@src/types/configuration';
import {ResultLocations} from '@src/types/locationTypes';
import {useEffect, useState} from 'react';
import {getConfigurationFirebase} from '../firebase/config/config';
import {getLocation} from '../locations/geocoderHook';
import {Platform} from 'react-native';
import {requestLocationPermission} from '../locations/permissionsHook';
import Geolocation from 'react-native-geolocation-service';

const config = () => {
  const [myCurrentLocation, setMyCurrentLocation] = useState<ResultLocations>();
  const [configuration, setConfiguration] = useState<Configuration>();

  const getGlobalConfig = (countryCode: string) => {
    getConfigurationFirebase(countryCode)
      .then(querySnapshot => {
        querySnapshot.forEach(value => {
          const data = value.data() as Configuration;
          setConfiguration(data);
        });
      })
      .catch(err => {
        console.debug('errorGetConfigFirebase ', err);
      });
  };

  const grantedPermissionAndroid = async () => {
    const granted = await requestLocationPermission();
    granted && getLocation(setMyCurrentLocation);
  };

  useEffect(() => {
    if (myCurrentLocation) {
      getGlobalConfig(myCurrentLocation.country.short_name);
    }
  }, [myCurrentLocation]);

  useEffect(() => {
    if (Platform.OS === 'android') {
      grantedPermissionAndroid();
    } else {
      Geolocation.requestAuthorization('whenInUse').then(result => {
        getLocation(setMyCurrentLocation);
      });
    }
  }, []);

  return {...configuration};
};

export {config};
