import {useNavigation} from '@react-navigation/native';
import {buttonActionInitialState} from '@src/globals/constants/login';
import {geUserByPhoneNumberFirebase} from '@src/hooks/firebase/user/user';
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
  const [errorUserNotExist, setErrorUserNotExist] = useState(false);

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
          console.log('okkkkk');

          buttonAction.logged = true;
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
    // if (data) {
    //   buttonAction.phone = data.phone;
    // }
    buttonAction.phone.length > 3 && validatePhoneNumber();
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
    setErrorUserNotExist
  };
};
export {loginHook};
