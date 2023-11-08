import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import {userFakeData} from '@src/globals/constants/fakeData';
import {buttonActionInitialState} from '@src/globals/constants/login';
import {config} from '@src/hooks/config/config';
import {geUserByPhoneNumberFirebase} from '@src/hooks/firebase/user/user';
import {getLocation} from '@src/hooks/locations/geocoderHook';
import {setGroupQuery, updateGroupQuery} from '@src/reactQuery/groupsQuery';
import {RegisterType, StackNavigation} from '@src/types/globalTypes';
import {Group} from '@src/types/groups';
import {ResultLocations} from '@src/types/locationTypes';
import {LoginFormAction} from '@src/types/loginTypes';
import {DataKey, User} from '@src/types/userTypes';
import {t} from 'i18next';
import {useEffect, useState} from 'react';
import {Platform} from 'react-native';

const adminFormHook = (type: RegisterType, phoneRef: any) => {
  const configuration = config();
  const os = Platform.OS;
  const navigation = useNavigation<StackNavigation>();
  const [myCurrentLocation, setMyCurrentLocation] = useState<ResultLocations>();
  const [alertGroupFound, setAlertGroupFound] = useState(false);
  const [groupFound, setGroupFound] = useState(false);
  const [user, setUser] = useState<User>();
  const [alertUserExist, setAlertUserExist] = useState(false);
  const [tokenPush, setTokenPush] = useState<string>();
  const [currentButtonAction, setCurrentButtonAction] =
    useState<LoginFormAction>(buttonActionInitialState);
  setGroupQuery(user?.group_number);
  const [codeAutogenerated, setCodeAutogenerated] = useState(false);
  const {isLoading, error, mutate, data} = updateGroupQuery();
  const [isLoadingForm, setIsLoadingForm] = useState(false);
  const [countryCode, setCountryCode] = useState<string>();
  const [errorRegister, setErrorRegister] = useState(false);
  const [errorPhone, setErrorPhone] = useState(false);
  const [value, setValue] = useState<string>();
  const [isNotValidEmail, setIsNotValidEmail] = useState(false);
  const [isNotSubmit, setIsNotSubmit] = useState(true);
  const [codeWasGenerated, setCodeWasGenerated] = useState(false);

  const getDevice = async () => {
    const device = await AsyncStorage.getItem('@fcmToken');
    device && setTokenPush(device);
  };

  const cleanPhone = (text: string) => {
    const currentPhone = text.slice(currentButtonAction.countryCodeSize + 1);
    return `+${phoneRef.current.getCountryCode()}${currentPhone}`;
  };

  const submitForm = () => {
    setIsNotSubmit(false);
    setIsLoadingForm(true);
    if (
      user &&
      user.phone &&
      user.group_number &&
      user.group_number != '' &&
      user.group_name &&
      user.name &&
      user.lastname &&
      user.email &&
      user.alias &&
      !alertUserExist &&
      !isNotValidEmail &&
      !alertGroupFound
    ) {
      const newPhone = cleanPhone(user.phone);
      user.phone = newPhone;
      const validatePhone = validateRegEx(user.phone);
      if (validatePhone) {
        const userExist = geUserByPhoneNumberFirebase(user.phone);
        userExist.then(querySnapshot => {
          if (querySnapshot.empty) {
            navigation.push('Login', {
              qr: true,
              data: user,
              type
            });
            currentButtonAction.phone = user.phone;
            currentButtonAction.logged = true;
            currentButtonAction.sendRegister = true;
          } else {
            setAlertUserExist(true);
          }
          setIsLoadingForm(false);
          setErrorRegister(false);
        });
        setErrorPhone(false);
      } else {
        setErrorPhone(true);
        setIsLoadingForm(false);
      }
    } else {
      !user?.group_number || user?.group_number === ''
        ? setAlertGroupFound(true)
        : (setAlertGroupFound(false),
          !codeWasGenerated && searchGroup(),
          codeWasGenerated && setErrorRegister(true));

      setIsLoadingForm(false);
    }
  };

  const emailValidate = (text: string) => {
    const reg = /^\w+([\\.-]?\w+)*@\w+([.-]?\w+)*(\.\w\w+)+$/;
    if (reg.test(text) === false) {
      setIsNotValidEmail(true);
      return true;
    } else {
      setIsNotValidEmail(false);
    }
  };

  const onChangeInput = (text: never, key: DataKey) => {
    if (key == 'email') {
      const newText: string = text;
      newText.length > 6 && emailValidate(text);
    }
    const userClone = user ? {...user} : {...userFakeData};
    userClone[key] = text;
    setUser(userClone);
  };

  const searchGroup = () => {
    setCodeWasGenerated(false);
    user && mutate(user.group_number);
  };

  const generateGroupCode = () => {
    setCodeAutogenerated(true);
    setCodeWasGenerated(true);
    const min = Math.ceil(0);
    const max = Math.floor(configuration.farm_random ?? 9999999999); // validar que no exista el cóidgo en la coleccion de grupos
    const random = Math.floor(Math.random() * (max - min) + min);
    const newCurrentUser = {...user};
    if (random === configuration?.vehicle_code) {
      generateGroupCode();
    } else {
      setAlertGroupFound(false);
      newCurrentUser.group_number = isNaN(random) ? '' : random.toString();
      setUser(newCurrentUser as User);
    }
  };

  const validateRegEx = (phone: string) => {
    if (currentButtonAction.phone != '') {
      const re = /[1-9]\d{9,14}$/;
      const phoneValidated = phone.slice(
        currentButtonAction.countryCodeSize + 1
      );
      return re.test(phoneValidated);
    }
    return false;
  };

  const validatePhoneNumber = (number: string) => {
    const validate = validateRegEx(number);
    if (validate) {
      setErrorPhone(false);
    } else {
      setErrorPhone(true);
    }
  };

  useEffect(() => {
    getDevice();
    if (
      currentButtonAction &&
      !currentButtonAction.logged &&
      !currentButtonAction.sendRegister &&
      myCurrentLocation &&
      tokenPush
    ) {
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
      if (type === 'vehicle' && configuration) {
        newCurrentUser.group_number = configuration.vehicle_code?.toString()!;
        newCurrentUser.group_name = t('general.vehicle');
      }

      // currentButtonAction?.show &&
      currentButtonAction?.phone?.length > 3 &&
        validatePhoneNumber(currentButtonAction.phone);
      setUser(newCurrentUser);
      setCountryCode(myCurrentLocation.country.short_name.toLowerCase());
    } else {
      if (user && user.phone && user.phone != '') {
        const newPhone = user.phone.slice(
          currentButtonAction.countryCodeSize + 1
        );
        currentButtonAction.phone = newPhone;
        setValue(newPhone);
      }
    }
  }, [currentButtonAction, myCurrentLocation, tokenPush]);

  useEffect(() => {
    if (type === 'vehicle' && configuration) {
      const userClone = {...user};
      userClone.group_number = configuration.vehicle_code?.toString();
    }
  }, [type, configuration]);

  useEffect(() => {
    getLocation(setMyCurrentLocation);
  }, []);

  useEffect(() => {
    if (!isLoading && data) {
      const userClone = {...user};
      if (data.data()) {
        const groupData = data.data() as Group;
        userClone.group_name = groupData.group_name;
        setUser(userClone as User);
        // setTimeout(() => {
        setGroupFound(true);
        setAlertGroupFound(false);
        // }, 2000);
      } else {
        setGroupFound(false);
        setAlertGroupFound(true);
        // userClone.group_name = '';
        // setUser(userClone as User);
      }
    }
  }, [data, isLoading]);

  return {
    configuration,
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
    isLoading,
    setCodeAutogenerated,
    codeAutogenerated,
    isLoadingForm,
    countryCode,
    errorRegister,
    setErrorRegister,
    errorPhone,
    phoneRef,
    value,
    isNotValidEmail,
    isNotSubmit,
    setIsNotSubmit,
    emailValidate
  };
};
export {adminFormHook};
