import {useNavigation, useRoute} from '@react-navigation/native';
import {getCurrentPosition} from '@src/hooks/locations/permissionsHook';
import {headerShown} from '@src/hooks/navigator/headerShown';
import {useGetUser} from '@src/hooks/user/useGetUser';
import {whatsapp} from '@src/hooks/whatsapp/whatsapp';
import {actualTheme} from '@src/types/contextTypes';
import {HomeParams, StackNavigation} from '@src/types/globalTypes';
import {User} from '@src/types/userTypes';
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

  const familyPanic =
    panics.length > 0 && panics.find(val => val.phone !== user?.phone);

  const onShare = async () => {
    const message =
      user?.type === 'residence'
        ? `${t('home.share')}.\n${t('home.code')}: ${user?.group_number}\n${t(
            'home.link'
          )}: https://t.ly/bodegalert.link`
        : `${t('home.shareToVehicle')}.\n${t(
            'home.link'
          )}: https://t.ly/bodegalert.link`;
    whatsapp(t('home.shareTitle'), message);
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
    onShare,
    familyPanic
  };
};

export {homeHook};
