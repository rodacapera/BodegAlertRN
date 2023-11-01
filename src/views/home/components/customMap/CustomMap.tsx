import CustomDialogAlert from '@src/components/customDialogAlert/CustomDialogAlert';
import CustomFab from '@src/components/customFab/CustomFab';
import CustomLoadingOverlay from '@src/components/customLoadingOverlay/CustomLoadingOverlay';
import {fakePosition} from '@src/globals/constants/fakeData';
import {
  mapStyleDark,
  mapStyleLight
} from '@src/globals/constants/mapsStylesMode';
import {actualTheme} from '@src/types/contextTypes';
import PanicButton from '@src/views/home/components/panicButton/PanicButton';
import {homeHook} from '@src/views/home/hooks/homeHook';
import {homeStyles} from '@src/views/home/styles/homeStyles';
import {t} from 'i18next';
import {Fragment, useRef} from 'react';
import {BackHandler, Image, Linking, Platform, View} from 'react-native';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import CalloutBadge from '../calloutBadge/CalloutBadge';

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
    isLoading,
    onShare,
    appVersion,
    markerTitle,
    markerBody,
    currentMarkerIcon,
    panicsMarkerIcon
  } = homeHook();

  return isLoading ? (
    <CustomLoadingOverlay visible />
  ) : appVersion ? (
    <CustomDialogAlert
      visible
      title={t('update.updateTitle')}
      description={t('update.updateDescription')}
      setVisible={() =>
        Linking.openURL(
          Platform.OS == 'android'
            ? 'https://play.google.com/store/apps/details?id=io.cordova.alarmu&hl=es_CO&gl=US'
            : 'https://apps.apple.com/us/app/bodegalert/id1428944146'
        )
      }
      continueButton
    />
  ) : (
    <Fragment>
      {region && markerTitle && markerBody && currentMarkerIcon ? (
        <MapView
          ref={mapRef}
          userLocationAnnotationTitle={'Map'}
          provider={PROVIDER_GOOGLE}
          style={homeStyles.map}
          region={region ?? fakePosition}
          customMapStyle={dark ? mapStyleDark : mapStyleLight}>
          <Marker
            coordinate={region}
            title={markerTitle}
            description={markerBody}
            image={currentMarkerIcon}
            style={{maxWidth: 400}}>
            {/* <Image source={currentMarkerIcon} /> */}
            {/* <CalloutBadge title={markerTitle} body={markerBody} /> */}
          </Marker>
          {panicsMarkerIcon &&
            panics.map((marker, index) => {
              return (
                marker.my_location.latitude != user?.location.lat &&
                marker.my_location.longitude != user?.location.lng && (
                  <Marker
                    key={index}
                    coordinate={marker.my_location}
                    title={marker.title}
                    description={marker.body}
                    image={panicsMarkerIcon}
                    // style={{width: 400}}
                  >
                    {/* <Image source={panicsMarkerIcon} /> */}
                    {/* <CalloutBadge title={marker.title} body={marker.body} /> */}
                  </Marker>
                )
              );
            })}
        </MapView>
      ) : (
        <CustomLoadingOverlay visible />
      )}
      <CustomFab
        icon={'share-variant'}
        position={'bottomLeft'}
        onPress={onShare}
        style={{
          borderRadius: 80,
          backgroundColor: 'rgba(255, 255, 255, 0.5)'
        }}
        iconColor="black"
      />
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
