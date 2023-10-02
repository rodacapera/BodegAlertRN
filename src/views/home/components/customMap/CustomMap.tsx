import {house, shop} from '@src/assets/images';
import CustomDialogAlert from '@src/components/customDialogAlert/CustomDialogAlert';
import CustomFab from '@src/components/customFab/CustomFab';
import {
  mapStyleDark,
  mapStyleLight
} from '@src/globals/constants/mapsStylesMode';
import {actualTheme} from '@src/types/contextTypes';
import {t} from 'i18next';
import {Fragment, useRef} from 'react';
import {BackHandler} from 'react-native';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import {homeHook} from '../../hooks/homeHook';
import {homeStyles} from '../../styles/homeStyles';
import PanicButton from '../panicButton/PanicButton';
import CustomLoadingOverlay from '@src/components/customLoadingOverlay/CustomLoadingOverlay';

const CustomMap = () => {
  const mapRef = useRef<any>();
  const {dark} = actualTheme();
  const {
    region,
    animateCamera,
    panics,
    user,
    alertVisible,
    setAlertVisible,
    isLoading
  } = homeHook();

  return isLoading ? (
    <CustomLoadingOverlay visible />
  ) : (
    <Fragment>
      <MapView
        ref={mapRef}
        userLocationAnnotationTitle={'Map'}
        provider={PROVIDER_GOOGLE} // remove if not using Google Maps
        style={homeStyles.map}
        region={region}
        customMapStyle={dark ? mapStyleDark : mapStyleLight}>
        {region && (
          <Marker
            coordinate={region}
            title={user?.alias}
            description={user?.address}
            image={house}
          />
        )}
        {panics.map((marker, index) => {
          const latLng = {
            latitude: marker.my_location.lat,
            longitude: marker.my_location.lng,
            latitudeDelta: 0.015,
            longitudeDelta: 0.0121
          };
          return (
            <Marker
              key={index}
              coordinate={latLng}
              title={marker.title}
              description={marker.body}
              image={shop}
            />
          );
        })}
      </MapView>
      <PanicButton />
      <CustomFab
        icon={'target'}
        position={'bottomRight'}
        onPress={() => animateCamera(mapRef, region!, 1000)}
        style={{
          borderRadius: 80,
          backgroundColor: 'rgba(255, 255, 255, 0.5)'
        }}
        iconColor="black"
      />
      <CustomDialogAlert
        visible={alertVisible}
        setVisible={setAlertVisible}
        cancelButton
        title={t('home.alertTitleExitApp')}
        description={t('home.alertDescriptionExitApp')}
        actionSuccess={() => BackHandler.exitApp()}
      />
    </Fragment>
  );
};

export default CustomMap;
