import {house, shop} from '@src/assets/images';
import CustomFab from '@src/components/customFab/CustomFab';
import {fakeMarkers, fakePosition} from '@src/globals/constants/fakeData';
import {Fragment, useEffect, useRef, useState} from 'react';
import MapView, {Marker, PROVIDER_GOOGLE, Region} from 'react-native-maps';
import {animateCamera, getMyLocation} from '../../hooks/homeHook';
import {homeStyles} from '../../styles/homeStyles';

const CustomMap = () => {
  const [region, setRegion] = useState<Region>(fakePosition);
  const mapRef = useRef<any>();
  const setMyCurrentLocation = async () => setRegion(await getMyLocation());

  useEffect(() => {
    setMyCurrentLocation();
  }, []);

  return (
    <Fragment>
      <MapView
        ref={mapRef}
        userLocationAnnotationTitle={'Map'}
        provider={PROVIDER_GOOGLE} // remove if not using Google Maps
        style={homeStyles.map}
        region={region}>
        <Marker
          coordinate={region}
          title={'home'}
          description={'ooooo'}
          image={house}
        />
        {fakeMarkers.map((marker, index) => {
          return (
            <Marker
              key={index}
              coordinate={marker.latlng}
              title={marker.title}
              description={marker.description}
              image={shop}
            />
          );
        })}
      </MapView>
      <CustomFab
        icon={'target'}
        position={'bottomRight'}
        onPress={() => animateCamera(mapRef, region, 1000)}
        style={{
          borderRadius: 80,
          backgroundColor: 'rgba(255, 255, 255, 0.5)'
        }}
      />
    </Fragment>
  );
};

export default CustomMap;
