import {house, shop} from '@src/assets/images';
import CustomDialogAlert from '@src/components/customDialogAlert/CustomDialogAlert';
import CustomFab from '@src/components/customFab/CustomFab';
import CustomLoadingOverlay from '@src/components/customLoadingOverlay/CustomLoadingOverlay';
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
          return (
            marker.my_location.latitude != user?.location.lat &&
            marker.my_location.longitude != user?.location.lng && (
              <Marker
                key={index}
                coordinate={marker.my_location}
                title={marker.title}
                description={marker.body}
                image={shop}
              />
            )
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
