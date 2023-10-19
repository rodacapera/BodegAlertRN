import {useNavigation} from '@react-navigation/native';
import {buttonActionInitialState} from '@src/globals/constants/login';
import {headerShown} from '@src/hooks/navigator/headerShown';
import {StackNavigation} from '@src/types/globalTypes';
import {LoginFormAction} from '@src/types/loginTypes';
import {User} from '@src/types/userTypes';
import {useEffect, useState} from 'react';

const loginHook = (data?: User) => {
  const navigation = useNavigation<StackNavigation>();
  const [errorPhone, setErrorPhone] = useState(false);
  const [buttonAction, setButtonAction] = useState(buttonActionInitialState);
  const [currentButtonAction, setCurrentButtonAction] =
    useState<LoginFormAction>(buttonActionInitialState);

  const validatePhoneNumber = () => {
    if (buttonAction.logged) {
      const validate = validateRegEx();
      buttonAction.phone.length == 2 || !validate
        ? setErrorPhone(true)
        : setErrorPhone(false);
    }
  };

  const validateRegEx = () => {
    if (buttonAction.phone != '') {
      const re = /[1-9]\d{9,14}$/;
      const phone = buttonAction.phone.slice(buttonAction.countryCodeSize + 1);
      return re.test(phone);
    }
    return false;
  };

  useEffect(() => {
    if (data) {
      buttonAction.logged = true;
      buttonAction.phone = data.phone;
    }
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
    validateRegEx
  };
};
export {loginHook};
