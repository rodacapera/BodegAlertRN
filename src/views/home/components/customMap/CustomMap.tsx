import {bike, bike_help, family_help, house, shop} from '@src/assets/images';
import CustomDialogAlert from '@src/components/customDialogAlert/CustomDialogAlert';
import CustomFab from '@src/components/customFab/CustomFab';
import CustomLoadingOverlay from '@src/components/customLoadingOverlay/CustomLoadingOverlay';
import {
  mapStyleDark,
  mapStyleLight
} from '@src/globals/constants/mapsStylesMode';
import {actualTheme} from '@src/types/contextTypes';
import {t} from 'i18next';
import {useRef} from 'react';
import {BackHandler, Linking, Platform} from 'react-native';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import {fakePosition} from '@src/globals/constants/fakeData';
import {homeHook} from '@src/views/home/hooks/homeHook';
import {homeStyles} from '@src/views/home/styles/homeStyles';
import PanicButton from '@src/views/home/components/panicButton/PanicButton';

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
    familyPanic,
    appVersion
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
    <>
      {region && (
        <MapView
          ref={mapRef}
          userLocationAnnotationTitle={'Map'}
          provider={PROVIDER_GOOGLE}
          style={homeStyles.map}
          region={region ?? fakePosition}
          customMapStyle={dark ? mapStyleDark : mapStyleLight}>
          {region && (
            <Marker
              coordinate={region}
              title={
                user?.type === 'residence'
                  ? familyPanic
                    ? familyPanic.title
                    : user?.alias
                  : user?.alias
              }
              description={
                user?.type === 'residence'
                  ? familyPanic
                    ? familyPanic.body
                    : user?.address
                  : user?.address
              }
              image={
                user?.type === 'residence'
                  ? familyPanic
                    ? family_help
                    : house
                  : bike
              }
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
                  image={user?.type === 'residence' ? shop : bike_help}
                />
              )
            );
          })}
        </MapView>
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
    </>
  );
};

export default CustomMap;
