import AsyncStorage from '@react-native-async-storage/async-storage';
import {buttonActionInitialState} from '@src/globals/constants/login';
import {useLogin} from '@src/hooks/firebase/login/loginWithPhoneNumber';
import {headerShown} from '@src/hooks/navigator/headerShown';
import {StackNavigation} from '@src/types/globalTypes';
import {LoginFormAction} from '@src/types/loginTypes';
import {OtpInputRef} from 'react-native-otp-entry';

export const handleBack = (
  setButtonAction: (e: LoginFormAction) => void,
  setCode: (e: string) => void
) => {
  setButtonAction(buttonActionInitialState);
  setCode('');
};

export const handleClear = (
  setCode: (e: string) => void,
  setErrorOtp: (e: boolean) => void,
  inputRef: OtpInputRef
) => {
  setCode('');
  setErrorOtp(false);
  inputRef.clear();
};

export const handleValidateOtp = (
  code: string,
  {navigate}: StackNavigation,
  setErrorOtp: (e: boolean) => void,
  currentButtonAction: LoginFormAction,
  setButtonAction: (e: LoginFormAction) => void,
  setCode: (e: string) => void
) => {
  const setUser = async (user: any) => {
    await AsyncStorage.setItem('@userAuth', JSON.stringify(user));
  };

  const validateOtp = (result: any) => {
    if (result) {
      setUser(result);
      return true;
    } else {
      setUser(false);
      return false;
    }
  };

  if (code.length === 6) {
    currentButtonAction.confirmation?.confirm(code).then(result => {
      if (validateOtp(result?.user)) {
        handleBack(setButtonAction, setCode);
        setErrorOtp(false);
        navigate('Home');
      } else {
        setErrorOtp(true);
      }
    });
  }
};

export const handleSendOtp = async (
  buttonAction: LoginFormAction,
  setSendOtpCode: (e: boolean) => void
) => {
  const confirmation = await useLogin(buttonAction.phone);
  buttonAction.confirmation = confirmation;
  AsyncStorage.setItem('@otp', JSON.stringify(true));
  setSendOtpCode(true);
};

const removeOtpCode = async () => {
  AsyncStorage.removeItem('@otp');
};

export const handleChange = (
  text: any,
  inputRef: any,
  setCode: (e: string) => void
) => {
  if (!isNaN(text)) {
    inputRef?.current?.setValue(text)!;
    setCode(text);
  } else {
    const str = text.substring(0, text.length - 1);
    inputRef?.current?.setValue(str);
  }
};

export const timerCount = (
  setCounter: (e: number) => void,
  sendOtpCode: (e: boolean) => void,
  sendCode: boolean,
  counter: number
) => {
  let count: any = null;
  let newCount = counter;
  if (sendCode) {
    if (!count) {
      count = setInterval(() => {
        if (newCount <= 1) {
          setCounter(60);
          sendOtpCode(false);
          clearInterval(count);
          removeOtpCode();
        } else {
          newCount = counter--;
          setCounter(newCount);
        }
      }, 1000);
    }
  }
};

export const getOtp = async (
  buttonAction: LoginFormAction,
  setSendOtpCode: (e: boolean) => void
) => {
  const otp = await AsyncStorage.getItem('@otp');
  if (!otp) {
    handleSendOtp(buttonAction, setSendOtpCode);
  } else {
    console.debug('the code has been sent', JSON.parse(otp));
  }
};
