import {useNavigation} from '@react-navigation/native';
import {buttonActionInitialState} from '@src/globals/constants/login';
import {geUserByPhoneNumberFirebase} from '@src/hooks/firebase/user/user';
import {getLocation} from '@src/hooks/locations/geocoderHook';
import {HeaderShown} from '@src/hooks/navigator/HeaderShown';
import {StackNavigation} from '@src/types/globalTypes';
import {ResultLocations} from '@src/types/locationTypes';
import {LoginFormAction} from '@src/types/loginTypes';
import {User} from '@src/types/userTypes';
import {t} from 'i18next';
import {useCallback, useEffect, useState} from 'react';

const LoginHook = (data?: User) => {
  const navigation = useNavigation<StackNavigation>();
  const [errorPhone, setErrorPhone] = useState(false);
  const [buttonAction, setButtonAction] = useState(buttonActionInitialState);
  const [currentButtonAction, setCurrentButtonAction] =
    useState<LoginFormAction>(buttonActionInitialState);
  const [errorUserNotExist, setErrorUserNotExist] = useState(false);
  const [myCurrentLocation, setMyCurrentLocation] = useState<ResultLocations>();
  const [loadingText, setLoadingText] = useState(t('general.loading'));

  const validateRegEx = useCallback(() => {
    if (buttonAction.phone != '') {
      const re = /[1-9]\d{9,14}$/;
      const phone = buttonAction.phone.slice(buttonAction.countryCodeSize + 1);
      return re.test(phone);
    }
    return false;
  }, [buttonAction.countryCodeSize, buttonAction.phone]);

  useEffect(() => {
    setTimeout(() => {
      setLoadingText(t('network.alertErrorTitle'));
    }, 20000);
    getLocation(setMyCurrentLocation);
  }, []);

  useEffect(() => {
    const validatePhoneNumber = () => {
      const validate = validateRegEx();
      if (validate) {
        const userExist = geUserByPhoneNumberFirebase(buttonAction.phone);
        userExist.then(querySnapshot => {
          if (querySnapshot.empty) {
            setErrorPhone(false);
            setErrorUserNotExist(true);
          } else {
            if (querySnapshot.docs[0].data().pay) {
              const buttonActionClone = {...buttonAction};
              buttonActionClone.logged = true;
              setButtonAction(buttonActionClone);
              setErrorPhone(false);
              setErrorPhone(false);
              setErrorUserNotExist(false);
            } else {
              setErrorPhone(false);
              setErrorUserNotExist(true);
            }
          }
        });
        // setTimeout(() => {
        setErrorUserNotExist(false);
        // }, 5000);
      } else {
        setErrorPhone(true);
      }
    };

    if (data) {
      buttonAction.phone = data.phone;
    }
    !buttonAction.logged &&
      buttonAction?.phone?.length > 3 &&
      validatePhoneNumber();
  }, [buttonAction, data, validateRegEx]);

  useEffect(() => {
    !currentButtonAction.logged &&
      HeaderShown({
        navigation,
        visible: false,
        transparent: false
      });
  }, [currentButtonAction.logged, navigation]);

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
    countryCode: myCurrentLocation?.country.short_name.toLowerCase(),
    loadingText
  };
};
export {LoginHook};
