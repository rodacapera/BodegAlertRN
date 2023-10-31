import {Configuration} from '@src/types/configuration';
import {ResultLocations} from '@src/types/locationTypes';
import {useEffect, useState} from 'react';
import {getConfigurationFirebase} from '../firebase/config/config';
import {getLocation} from '../locations/geocoderHook';

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
        console.debug('error ', err);
      });
  };

  useEffect(() => {
    if (myCurrentLocation) {
      getGlobalConfig(myCurrentLocation.country.short_name);
    }
  }, [myCurrentLocation]);

  useEffect(() => {
    getLocation(setMyCurrentLocation);
  }, []);

  return {...configuration};
};

export {config};
