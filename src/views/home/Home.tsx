import {backgroundStyle} from '@src/globals/styles/screenMode';
import {backAction} from '@src/hooks/home/homeHook';
import {actualTheme} from '@src/types/contextTypes';
import {HomeProps} from '@src/types/globalTypes';
import {useEffect} from 'react';
import {BackHandler, SafeAreaView, View, StyleSheet} from 'react-native';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import {Text} from 'react-native-paper';
import {homeStyles} from './styles/homeStyles';
import {fakeMarkers, fakePosition} from '@src/globals/constants/fakeData';
import {house, pin, shop, shop1} from '@src/assets/images';
const Home = ({navigation, route}: HomeProps) => {
  const {colors, theme, dark} = actualTheme();

  useEffect(() => {
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
        provider={PROVIDER_GOOGLE} // remove if not using Google Maps
        style={homeStyles.map}
        region={fakePosition}
        zoomControlEnabled>
        {fakeMarkers.map((marker, index) => {
          return (
            <Marker
              key={index}
              coordinate={marker.latlng}
              title={marker.title}
              description={marker.description}
              image={marker.myPosition ? house : shop}
            />
          );
        })}
      </MapView>
    </View>
  );

  // return (
  //   <SafeAreaView style={backgroundStyle}>
  //     <Text>Home</Text>
  //   </SafeAreaView>
  // );
};

export default Home;
