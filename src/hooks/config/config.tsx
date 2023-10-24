import {Configuration} from '@src/types/configuration';
import {getConfigurationFirebase} from '../firebase/config/config';
import {useEffect, useState} from 'react';
import {getLocation} from '../locations/geocoderHook';
import {ResultLocations} from '@src/types/locationTypes';

const config = () => {
  const [myCurrentLocation, setMyCurrentLocation] = useState<ResultLocations>();
  const [configuration, setConfiguration] = useState<Configuration>();
  const getConfig = (countryCode: string) => {
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
    if (myCurrentLocation) getConfig(myCurrentLocation.country.short_name);
  }, [myCurrentLocation]);

  useEffect(() => {
    getLocation(setMyCurrentLocation);
  }, []);

  return {...configuration};
};

export {config};
