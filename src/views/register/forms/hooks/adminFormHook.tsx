import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import {userFakeData} from '@src/globals/constants/fakeData';
import {buttonActionInitialState} from '@src/globals/constants/login';
import {getConfigurationFirebase} from '@src/hooks/firebase/config/config';
import {geUserByPhoneNumberFirebase} from '@src/hooks/firebase/user/user';
import {getLocation} from '@src/hooks/locations/geocoderHook';
import {setGroupQuery, updateGroupQuery} from '@src/reactQuery/groupsQuery';
import {Configuration} from '@src/types/configuration';
import {RegisterType, StackNavigation} from '@src/types/globalTypes';
import {Group} from '@src/types/groups';
import {ResultLocations} from '@src/types/locationTypes';
import {LoginFormAction} from '@src/types/loginTypes';
import {DataKey, User} from '@src/types/userTypes';
import {useEffect, useState} from 'react';
import {Platform} from 'react-native';

const adminFormHook = (type: RegisterType) => {
  const os = Platform.OS;
  const navigation = useNavigation<StackNavigation>();
  const [configuration, setConfiguration] = useState<Configuration>();
  const [myCurrentLocation, setMyCurrentLocation] = useState<ResultLocations>();
  const [alertGroupFound, setAlertGroupFound] = useState(false);
  const [groupFound, setGroupFound] = useState(false);
  const [user, setUser] = useState<User>();
  const [alertUserExist, setAlertUserExist] = useState(false);
  const [tokenPush, setTokenPush] = useState<string>();
  const [currentButtonAction, setCurrentButtonAction] =
    useState<LoginFormAction>(buttonActionInitialState);
  setGroupQuery(user?.group_number);
  const {isLoading, error, mutate, data} = updateGroupQuery();

  const getDevice = async () => {
    const device = await AsyncStorage.getItem('@fcmToken');
    device && setTokenPush(device);
  };

  const getConfig = (countryCode: string) => {
    getConfigurationFirebase(countryCode).then(querySnapshot => {
      querySnapshot.forEach(value => {
        const data = value.data() as Configuration;
        setConfiguration(data);
      });
    });
  };

  const submitForm = () => {
    console.log('user', user);

    if (user) {
      const userExist = geUserByPhoneNumberFirebase(user.phone);
      userExist.then(querySnapshot => {
        if (querySnapshot.empty) {
          navigation.navigate('Login', {
            qr: true,
            data: user,
            type
          });
        } else {
          setAlertUserExist(true);
        }
      });
    }
  };

  const onChangeInput = (text: never, key: DataKey) => {
    const userClone = user ? {...user} : {...userFakeData};
    userClone[key] = text;
    setUser(userClone);
  };

  const searchGroup = () => {
    user && mutate(user.group_number);
  };

  const generateGroupCode = () => {
    const min = Math.ceil(0);
    const max = Math.floor(configuration?.farm_random!);
    const random = Math.floor(Math.random() * (max - min) + min);
    const newCurrentUser = {...user};
    if (random === configuration?.vehicle_code) {
      generateGroupCode();
    } else {
      newCurrentUser.group_number = random.toString();
      setUser(newCurrentUser as User);
    }
  };

  useEffect(() => {
    if (myCurrentLocation) getConfig(myCurrentLocation.country.short_name);
    getDevice();
    if (currentButtonAction && myCurrentLocation && tokenPush) {
      const newCurrentUser = user ? {...user} : {...userFakeData};
      newCurrentUser.administrator = true;
      newCurrentUser.created = Date.now().toString();
      newCurrentUser.date = Date.now().toString();
      newCurrentUser.address = myCurrentLocation.address
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '');
      newCurrentUser.city = myCurrentLocation.city.long_name
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '');
      newCurrentUser.departament = myCurrentLocation.state.long_name
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '');
      newCurrentUser.location = myCurrentLocation.location!;
      newCurrentUser.phone = currentButtonAction.phone;
      newCurrentUser.pay = true;
      newCurrentUser.avatar = '';
      newCurrentUser.zipcode = parseInt(myCurrentLocation.zipCode.short_name);
      newCurrentUser.devices = [{device: tokenPush, os}];
      newCurrentUser.countryCode = myCurrentLocation.country.short_name;
      newCurrentUser.type = type;
      setUser(newCurrentUser);
    }
  }, [currentButtonAction, myCurrentLocation, tokenPush]);

  useEffect(() => {
    // console.log('type', type);
    if (type === 'vehicle' && configuration) {
      const userClone = {...user};
      userClone.group_number = configuration.vehicle_code.toString();
    }
  }, [type, configuration]);

  useEffect(() => {
    getLocation(setMyCurrentLocation);
  }, []);

  useEffect(() => {
    if (!isLoading && data) {
      if (data.data()) {
        const groupData = data.data() as Group;
        const userClone = {...user};
        userClone.group_name = groupData.group_name;
        setUser(userClone as User);
        setTimeout(() => {
          setGroupFound(true);
          setAlertGroupFound(false);
        }, 2000);
      } else {
        setGroupFound(false);
        setAlertGroupFound(true);
        const userClone = {...user};
        userClone.group_name = '';
        setUser(userClone as User);
      }
    }
  }, [data, isLoading]);

  return {
    configuration,
    setConfiguration,
    myCurrentLocation,
    setMyCurrentLocation,
    currentButtonAction,
    setCurrentButtonAction,
    generateGroupCode,
    searchGroup,
    alertGroupFound,
    setAlertGroupFound,
    onChangeInput,
    groupFound,
    submitForm,
    user,
    alertUserExist,
    setAlertUserExist,
    isLoading
  };
};
export {adminFormHook};
