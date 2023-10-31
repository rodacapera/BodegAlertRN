import {useNavigation} from '@react-navigation/native';
import {buttonActionInitialState} from '@src/globals/constants/login';
import {config} from '@src/hooks/config/config';
import {geUserByPhoneNumberFirebase} from '@src/hooks/firebase/user/user';
import {getLocation} from '@src/hooks/locations/geocoderHook';
import {headerShown} from '@src/hooks/navigator/headerShown';
import {StackNavigation} from '@src/types/globalTypes';
import {ResultLocations} from '@src/types/locationTypes';
import {LoginFormAction} from '@src/types/loginTypes';
import {User} from '@src/types/userTypes';
import {useEffect, useState} from 'react';

const loginHook = (data?: User) => {
  const configuration = config();
  const navigation = useNavigation<StackNavigation>();
  const [errorPhone, setErrorPhone] = useState(false);
  const [buttonAction, setButtonAction] = useState(buttonActionInitialState);
  const [currentButtonAction, setCurrentButtonAction] =
    useState<LoginFormAction>(buttonActionInitialState);
  const [errorUserNotExist, setErrorUserNotExist] = useState(false);
  const [myCurrentLocation, setMyCurrentLocation] = useState<ResultLocations>();

  const validateRegEx = () => {
    if (buttonAction.phone != '') {
      const re = /[1-9]\d{9,14}$/;
      const phone = buttonAction.phone.slice(buttonAction.countryCodeSize + 1);
      return re.test(phone);
    }
    return false;
  };

  const validatePhoneNumber = () => {
    const validate = validateRegEx();
    if (validate) {
      const userExist = geUserByPhoneNumberFirebase(buttonAction.phone);
      userExist.then(querySnapshot => {
        if (querySnapshot.empty) {
          setErrorPhone(false);
          setErrorUserNotExist(true);
        } else {
          const buttonActionClone = {...buttonAction};
          buttonActionClone.logged = true;
          setButtonAction(buttonActionClone);
          setErrorPhone(false);
          setErrorPhone(false);
          setErrorUserNotExist(false);
        }
      });
      setTimeout(() => {
        setErrorUserNotExist(false);
      }, 5000);
    } else {
      setErrorPhone(true);
    }
  };

  useEffect(() => {
    getLocation(setMyCurrentLocation);
  }, []);

  useEffect(() => {
    if (data) {
      buttonAction.phone = data.phone;
    }
    !buttonAction.logged &&
      buttonAction.phone.length > 3 &&
      validatePhoneNumber();
  }, [buttonAction, data]);

  useEffect(() => {
    !currentButtonAction.logged &&
      headerShown({
        navigation,
        visible: false,
        transparent: false
      });
  });

  return {
    errorPhone,
    setErrorPhone,
    buttonAction,
    setButtonAction,
    currentButtonAction,
    setCurrentButtonAction,
    validateRegEx,
    errorUserNotExist,
    setErrorUserNotExist,
    configuration,
    countryCode: myCurrentLocation?.country.short_name.toLowerCase()
  };
};
export {loginHook};
