import CustomDialogAlert from '@src/components/customDialogAlert/CustomDialogAlert';
import CustomFab from '@src/components/customFab/CustomFab';
import CustomLoadingOverlay from '@src/components/customLoadingOverlay/CustomLoadingOverlay';
import {fakePosition} from '@src/globals/constants/fakeData';
import {
  mapStyleDark,
  mapStyleLight
} from '@src/globals/constants/mapsStylesMode';
import PanicButton from '@src/views/home/components/panicButton/PanicButton';

import {homeStyles} from '@src/views/home/styles/homeStyles';
import {t} from 'i18next';
import {useRef} from 'react';
import {BackHandler, Linking, Platform, View} from 'react-native';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import {Portal, Snackbar} from 'react-native-paper';
import {HomeHook} from '../../hooks/HomeHook';

const CustomMap = () => {
  const mapRef = useRef<any>();

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
    panicsMarkerIcon,
    configuration,
    dark,
    colors,
    snackVisible,
    onDismissSnackBar,
    setSnackVisible
  } = HomeHook();

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
    <View style={homeStyles.container}>
      {region &&
      markerTitle &&
      markerBody &&
      currentMarkerIcon &&
      panicsMarkerIcon ? (
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
            style={{maxWidth: 400}}></Marker>
          {panics.map((marker, index) => {
            const showMarker =
              marker.my_location.latitude != user?.location.lat &&
              marker.my_location.longitude != user?.location.lng;

            return (
              showMarker && (
                <Marker
                  key={index}
                  coordinate={marker.my_location}
                  title={marker.title}
                  description={marker.body}
                  image={panicsMarkerIcon}></Marker>
              )
            );
          })}
        </MapView>
      ) : (
        <CustomLoadingOverlay visible />
      )}
      {configuration && (
        <PanicButton
          user={user}
          configuration={configuration}
          setSnackVisible={setSnackVisible}
        />
      )}
      <CustomFab
        icon={'share-variant'}
        position={'bottomLeft'}
        onPress={onShare}
        style={{
          borderRadius: 80,
          backgroundColor: dark
            ? colors.onPrimaryContainer
            : colors.elevation.level4
        }}
        iconColor="black"
      />

      <CustomFab
        icon={'target'}
        position={'bottomRight'}
        onPress={() => animateCamera(mapRef, region!, 1000)}
        style={{
          borderRadius: 80,
          backgroundColor: dark
            ? colors.onPrimaryContainer
            : colors.elevation.level4
        }}
        iconColor="black"
      />
      <Portal>
        <CustomFab
          icon={'phone'}
          position={'topRight'}
          onPress={() => Linking.openURL(`tel:${configuration.emergency}`)}
          style={{
            shadowColor: 'transparent',
            elevation: 0,
            borderRadius: 80,
            backgroundColor: 'transparent'
          }}
          iconColor={
            dark ? colors.onPrimaryContainer : colors.onPrimaryContainer
          }
        />
      </Portal>

      <CustomDialogAlert
        visible={alertVisible}
        setVisible={setAlertVisible}
        cancelButton
        title={t('home.alertTitleExitApp')}
        description={t('home.alertDescriptionExitApp')}
        actionSuccess={() => BackHandler.exitApp()}
      />
      <Snackbar
        visible={snackVisible}
        onDismiss={onDismissSnackBar}
        action={{
          label: t('general.ok'),
          onPress: () => {
            // Do something
          }
        }}>
        {t('notifyView.notifySend')}
      </Snackbar>
    </View>
  );
};

export default CustomMap;
