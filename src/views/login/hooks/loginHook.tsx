import {useNavigation} from '@react-navigation/native';
import {buttonActionInitialState} from '@src/globals/constants/login';
import {headerShown} from '@src/hooks/navigator/headerShown';
import {StackNavigation} from '@src/types/globalTypes';
import {LoginFormAction} from '@src/types/loginTypes';
import {useEffect, useState} from 'react';

const loginHook = () => {
  const navigation = useNavigation<StackNavigation>();
  const [errorPhone, setErrorPhone] = useState(false);
  const [buttonAction, setButtonAction] = useState(buttonActionInitialState);
  const [currentButtonAction, setCurrentButtonAction] =
    useState<LoginFormAction>(buttonActionInitialState);

  const validatePhoneNumber = () => {
    buttonAction.logged &&
    (buttonAction.phone.length == 2 || buttonAction.phone.length < 10)
      ? setErrorPhone(true)
      : setErrorPhone(false);
  };

  useEffect(() => {
    validatePhoneNumber();
  }, [buttonAction]);

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
    validatePhoneNumber
  };
};
export {loginHook};
