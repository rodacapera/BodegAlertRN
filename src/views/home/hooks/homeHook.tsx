import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation, useRoute} from '@react-navigation/native';
import {bike, bike_help, family_help, home, shop} from '@src/assets/images';
import {Config} from '@src/hooks/config/Config';
import {HeaderShown} from '@src/hooks/navigator/HeaderShown';
import {whatsapp} from '@src/hooks/whatsapp/whatsapp';
import {GetPanicsQuery} from '@src/reactQuery/NotifyQuery';
import {GetUserQuery} from '@src/reactQuery/UserQuery';
import {Configuration} from '@src/types/configuration';
// import {setUserQuery} from '@src/reactQuery/userQuery';
import {actualTheme} from '@src/types/contextTypes';
import {HomeParams, StackNavigation} from '@src/types/globalTypes';
import {Panics, User} from '@src/types/userTypes';
import {t} from 'i18next';
import {useEffect, useState} from 'react';
import {
  BackHandler,
  Platform,
  useColorScheme,
  useWindowDimensions
} from 'react-native';
import {Region} from 'react-native-maps';

const HomeHook = () => {
  // setUserQuery();
  const route = useRoute();
  const {width} = useWindowDimensions();
  const {colors} = actualTheme();
  const colorScheme = useColorScheme();
  const navigation = useNavigation<StackNavigation>();

  const configuration = Config() as Configuration;
  const {isLoading, data} = GetUserQuery();
  const panics = GetPanicsQuery().data as Panics[];

  const [region, setRegion] = useState<Region>();
  const [alertVisible, setAlertVisible] = useState(false);
  const [appVersion, setAppVersion] = useState<boolean>();
  const [markerTitle, setMarkerTitle] = useState<string>();
  const [markerBody, setMarkerBody] = useState<string>();
  const [currentMarkerIcon, setCurrentMarkerIcon] = useState();
  const [panicsMarkerIcon, setPanicsMarkerIcon] = useState();

  const user = data.user as User;
  const params = route.params as HomeParams;

  const appVersionBd =
    Platform.OS == 'ios'
      ? configuration?.versionIOS
      : configuration?.versionAndroid;

  const animateCamera = async (mapRef: any, region: Region, speed: number) => {
    const camera = await mapRef.current.getCamera();
    // camera.heading += 40;
    // camera.pitch += 100;
    camera.zoom += camera.zoom < 15.5 ? 1 : 0;
    camera.center = {latitude: region.latitude, longitude: region.longitude};
    mapRef.current.animateCamera(camera, {duration: speed});
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

  const onShare = async () => {
    const message =
      user?.type === 'residence'
        ? `${t('home.share')}.\n${t('home.code')}: ${user?.group_number}\n${t(
            'home.link'
          )}: ${configuration.link_app}`
        : `${t('home.shareToVehicle')}.\n${t('home.link')}:${
            configuration.link_app
          }`;
    whatsapp(t('home.shareTitle'), message);
  };

  useEffect(() => {
    if (navigation) {
      const backHandler = BackHandler.addEventListener(
        'hardwareBackPress',
        () => backAction(navigation)
      );
      return () => backHandler.remove();
    }
  }, [navigation]);

  useEffect(() => {
    console.log('ssss', navigation.getState().index == 0);
    console.log('params', params);
    if (
      navigation.getState().index == 0 ||
      (params && (params.isLogin || params.isBack))
    ) {
      HeaderShown({
        navigation,
        width: width,
        visible: !isLoading,
        transparent: true,
        titleColor:
          Platform.OS == 'android'
            ? colorScheme === 'dark'
              ? '#a23234'
              : colors.onPrimaryContainer
            : colors.onPrimaryContainer
      });
    } else {
      HeaderShown({
        navigation,
        width: width,
        visible: !isLoading,
        transparent: true,
        titleColor: colors.onPrimaryContainer
      });
    }
  }, [
    colorScheme,
    colors.onPrimaryContainer,
    isLoading,
    navigation,
    params,
    width
  ]);

  useEffect(() => {
    const setMyCurrentLocation = () => {
      if (user?.location.lat && user.location.lng) {
        const shopLocation = {
          latitude: user?.location.lat,
          longitude: user?.location.lng,
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121
        };
        setRegion(shopLocation);
      }
    };

    const checkVersion = async (appVersionBd: string) => {
      const currentVersion = await AsyncStorage.getItem('@app_version');
      if (currentVersion) {
        const updateVersion = appVersionBd > currentVersion ? true : false;
        setAppVersion(updateVersion);
      } else {
        checkVersion(appVersionBd);
      }
    };

    const getCalloutText = () => {
      const familyPanic =
        panics.length > 0 &&
        panics.find(
          val =>
            val.alias == user.alias &&
            (val.phone !== user?.phone || val.name.includes('shellybutton1'))
        );

      const title =
        user?.type === 'residence'
          ? familyPanic
            ? familyPanic.title
            : user?.alias
          : user?.alias;

      const body =
        user?.type === 'residence'
          ? familyPanic
            ? familyPanic.body
            : user?.address
          : user?.address;
      const currentIcon =
        user?.type === 'residence' ? (familyPanic ? family_help : home) : bike;

      const panicsIcon = user?.type === 'residence' ? shop : bike_help;

      setMarkerTitle(title);
      setMarkerBody(body);
      setCurrentMarkerIcon(currentIcon);
      setPanicsMarkerIcon(panicsIcon);
    };

    if (user) {
      !region && setMyCurrentLocation();
      !appVersion && appVersionBd && checkVersion(appVersionBd);
      panics && getCalloutText();
    }
  }, [appVersion, appVersionBd, panics, region, user]);

  return {
    region,
    animateCamera,
    // getMyLocation,
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
    configuration
  };
};

export {HomeHook};
