import {buttonActionInitialState} from '@src/globals/constants/login';
import {StackNavigation} from '@src/types/globalTypes';
import {LoginFormAction} from '@src/types/loginTypes';
import {OtpInputRef} from 'react-native-otp-entry';

export const handleBack = (
  setButtonAction: (e: LoginFormAction) => void,
  setIsLogin: (e: boolean) => void,
  setCode: (e: string) => void,
) => {
  setButtonAction(buttonActionInitialState);
  setIsLogin(false);
  setCode('');
};

export const handleClear = (
  setCode: (e: string) => void,
  setErrorOtp: (e: boolean) => void,
  inputRef: OtpInputRef,
) => {
  setCode('');
  setErrorOtp(false);
  inputRef.clear();
};

export const handleValidateOtp = (
  code: string,
  {navigate}: StackNavigation,
  setErrorOtp: (e: boolean) => void,
) => {
  console.log('send', code); //validate code with firebase
  const validateOtp = () => {
    return false;
  };
  if (code.length === 6) {
    if (validateOtp()) {
      setErrorOtp(false);
      navigate('Home');
    } else {
      setErrorOtp(true);
    }
  }
};

export const handleSendOtp = (
  buttonAction: LoginFormAction,
  setSendOtpCode: (e: boolean) => void,
) => {
  console.log('send OTP to phone', buttonAction);
  setSendOtpCode(true);
};

export const handleChange = (
  text: any,
  inputRef: any,
  setCode: (e: string) => void,
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
  counter: number,
) => {
  let timer: any = null;
  let count: any = null;
  if (sendCode) {
    timer = setTimeout(() => {
      setCounter(60);
      sendOtpCode(false);
      clearTimeout(timer);
    }, 60000);
    if (!count) {
      count = setInterval(() => {
        let newCount = counter--;
        setCounter(newCount);
        console.log('newCount', newCount);
        if (newCount <= 0) {
          console.log('cleaning');
          clearTimeout(timer);
          clearInterval(count);
          setCounter(60);
          sendOtpCode(false);
        }
      }, 1000);
    }
  }
};
