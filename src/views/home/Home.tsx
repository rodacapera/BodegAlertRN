import {house, shop} from '@src/assets/images';
import CustomFab from '@src/components/customFab/CustomFab';
import {fakeMarkers, fakePosition} from '@src/globals/constants/fakeData';
import {backAction} from '@src/hooks/home/homeHook';
import {actualTheme} from '@src/types/contextTypes';
import {HomeProps} from '@src/types/globalTypes';
import {useEffect, useRef, useState} from 'react';
import {BackHandler, View} from 'react-native';
import MapView, {Marker, PROVIDER_GOOGLE, Region} from 'react-native-maps';
import {animateCamera, getMyLocation} from './hooks/homeHook';
import {homeStyles} from './styles/homeStyles';

const Home = ({navigation, route}: HomeProps) => {
  const {colors, theme, dark} = actualTheme();
  const [region, setRegion] = useState<Region>(fakePosition);
  const mapRef = useRef<any>();

  const setMyCurrentLocation = async () => setRegion(await getMyLocation());

  useEffect(() => {
    setMyCurrentLocation();
    navigation.getParent()?.setOptions({
      headerShown: true
    });
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () =>
      backAction(navigation)
    );
    return () => backHandler.remove();
  }, []);

  return (
    <View style={homeStyles.container}>
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
        styles={'bottomRight'}
        onPress={() => animateCamera(mapRef, region, 1000)}
      />
    </View>
  );
};

export default Home;
