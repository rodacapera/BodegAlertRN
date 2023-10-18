import {useNavigation, useRoute} from '@react-navigation/native';
import {getDynamicLinkFirebase} from '@src/hooks/firebase/dynamicLink/dynamicLink';
import {getCurrentPosition} from '@src/hooks/locations/permissionsHook';
import {headerShown} from '@src/hooks/navigator/headerShown';
import {useGetUser} from '@src/hooks/user/useGetUser';
import {actualTheme} from '@src/types/contextTypes';
import {HomeParams, StackNavigation} from '@src/types/globalTypes';
import {t} from 'i18next';
import {useEffect, useState} from 'react';
import {Alert, BackHandler, Share} from 'react-native';
import {Region} from 'react-native-maps';

const homeHook = () => {
  const {user, panics, isLoading} = useGetUser();
  const [region, setRegion] = useState<Region>();
  const [alertVisible, setAlertVisible] = useState(false);
  const {colors, dark} = actualTheme();
  const route = useRoute();
  const params = route.params as HomeParams;
  const navigation = useNavigation<StackNavigation>();

  const animateCamera = async (mapRef: any, region: Region, speed: number) => {
    const camera = await mapRef.current.getCamera();
    // camera.heading += 40;
    // camera.pitch += 100;
    camera.zoom += camera.zoom < 15.5 ? 1 : 0;
    camera.center = {latitude: region.latitude, longitude: region.longitude};
    mapRef.current.animateCamera(camera, {duration: speed});
  };

  const getMyLocation = async () => {
    const location = await getCurrentPosition();
    return {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      latitudeDelta: 0.015,
      longitudeDelta: 0.0121
    };
  };

  const backAction = (navigation: StackNavigation) => {
    if (navigation.getState().index === 1) {
      setAlertVisible(true);
      return true;
    } else {
      setAlertVisible(false);
      return false;
    }
  };

  const setMyCurrentLocation = () => {
    if (user?.location) {
      const shopLocation = {
        latitude: user?.location.lat!,
        longitude: user?.location.lng!,
        latitudeDelta: 0.015,
        longitudeDelta: 0.0121
      };
      setRegion(shopLocation);
    }
  };

  const onShare = async () => {
    try {
      const result = await Share.share({
        title: t('home.shareTitle'),
        message: `${t('home.share')}.\n${t('home.code')}: ${
          user?.group_number
        }\n${t('home.link')}: https://t.ly/bodegalert.link`
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
          console.debug('share', result.activityType);
        } else {
          // shared
          console.debug('share', result);
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
        console.debug('dismissed');
      }
    } catch (error: any) {
      Alert.alert(error.message);
    }
  };

  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () =>
      backAction(navigation)
    );
    return () => backHandler.remove();
  }, []);

  useEffect(() => {
    if (params && (params.isLogin || params.isBack)) {
      headerShown({
        navigation,
        visible: !isLoading,
        transparent: true,
        titleColor: colors.onPrimaryContainer
      });
    } else if (!params) {
      headerShown({
        navigation,
        visible: !isLoading,
        transparent: true,
        titleColor: colors.onPrimaryContainer
      });
    }
    !region && setMyCurrentLocation();
  }, [params, dark, user, region]);

  return {
    region,
    animateCamera,
    getMyLocation,
    panics,
    user,
    alertVisible,
    setAlertVisible,
    isLoading,
    onShare
  };
};

export {homeHook};
