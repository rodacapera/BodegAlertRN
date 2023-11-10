import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation, useRoute} from '@react-navigation/native';
import {bike, bike_help, family_help, home, shop} from '@src/assets/images';
import {HeaderShown} from '@src/hooks/navigator/HeaderShown';
import {ActualTheme} from '@src/hooks/navigator/hook/GlobalTheme';
import {useGetUser} from '@src/hooks/user/useGetUser';
import {whatsapp} from '@src/hooks/whatsapp/whatsapp';
import {HomeParams, StackNavigation} from '@src/types/globalTypes';
import {User} from '@src/types/userTypes';
import {t} from 'i18next';
import {useEffect, useState} from 'react';
import {
  BackHandler,
  Platform,
  useColorScheme,
  useWindowDimensions
} from 'react-native';
import {Region} from 'react-native-maps';
let isMounted = true;

const HomeHook = () => {
  const navigation = useNavigation<StackNavigation>();
  const route = useRoute();
  const {width} = useWindowDimensions();
  const {dark, colors} = ActualTheme();

  const colorScheme = useColorScheme();

  // const {isLoading, data} = GetUserQuery();
  // const configuration = Config() as Configuration;
  // const panics = GetPanicsQuery().data as Panics[];

  const {user, panics, configuration, isLoading} = useGetUser();

  const [region, setRegion] = useState<Region>();
  const [alertVisible, setAlertVisible] = useState(false);
  const [appVersion, setAppVersion] = useState<boolean>();
  const [markerTitle, setMarkerTitle] = useState<string>();
  const [markerBody, setMarkerBody] = useState<string>();
  const [currentMarkerIcon, setCurrentMarkerIcon] = useState();
  const [panicsMarkerIcon, setPanicsMarkerIcon] = useState();
  const [snackVisible, setSnackVisible] = useState(false);

  const onDismissSnackBar = () => setSnackVisible(false);

  // const user = data?.user as User;
  const params = route.params as HomeParams;

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
    let isMounted = true;
    if (isMounted) {
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
    }
    return () => {
      isMounted = false;
    };
  }, [
    colorScheme,
    colors.onPrimaryContainer,
    isLoading,
    navigation,
    params,
    width
  ]);

  useEffect(() => {
    const getCalloutText = (user: User) => {
      const familyPanic =
        panics.length > 0 &&
        panics.find(
          val =>
            val.alias == user.alias &&
            (val.phone !== user.phone || val.name.includes('shellybutton1'))
        );

      const title =
        user.type === 'residence'
          ? familyPanic
            ? familyPanic.title
            : user.alias
          : user.alias;

      const body =
        user.type === 'residence'
          ? familyPanic
            ? familyPanic.body
            : user.address
          : user.address;

      const currentIcon =
        user.type === 'residence' ? (familyPanic ? family_help : home) : bike;
      setMarkerTitle(title);
      setMarkerBody(body);
      setCurrentMarkerIcon(currentIcon);
    };
    panics && user && getCalloutText(user);
  }, [panics, user]);

  useEffect(() => {
    const panicsIcon = user?.type === 'residence' ? shop : bike_help;
    setPanicsMarkerIcon(panicsIcon);
  }, [user?.type]);

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
    !region && user && setMyCurrentLocation();
  }, [region, user]);

  useEffect(() => {
    const checkVersion = async () => {
      if (isMounted) {
        isMounted = false;
        const appVersionBd =
          Platform.OS == 'ios'
            ? configuration.versionIOS
            : configuration.versionAndroid;
        const currentVersion = await AsyncStorage.getItem('@app_version');
        if (currentVersion) {
          const updateVersion =
            appVersionBd > currentVersion.toString() ? true : false;
          setAppVersion(updateVersion);
        } else {
          await AsyncStorage.setItem('@app_version', appVersionBd);
        }
      }
    };
    configuration.versionIOS && configuration.versionAndroid && checkVersion();
  }, [configuration]);

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
    configuration,
    dark,
    colors,
    snackVisible,
    onDismissSnackBar,
    setSnackVisible
  };
};

export {HomeHook};
