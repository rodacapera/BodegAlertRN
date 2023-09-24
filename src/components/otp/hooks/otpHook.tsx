import {LoginFormAction} from '@src/types/loginTypes';
import {useEffect, useRef, useState} from 'react';
import {OtpInputRef} from 'react-native-otp-entry';
import {getOtp, timerCount} from './otpFunctions';

const otpHook = ({buttonAction}: {buttonAction: LoginFormAction}) => {
  const inputRef = useRef<OtpInputRef>();
  const [code, setCode] = useState('');
  const [errorOtp, setErrorOtp] = useState(false);
  const [sendOtpCode, setSendOtpCode] = useState(false);
  const [counter, setCounter] = useState(60);

  useEffect(() => {
    getOtp(buttonAction, setSendOtpCode);
  }, []);

  useEffect(() => {
    counter === 60 &&
      timerCount(setCounter, setSendOtpCode, sendOtpCode, counter);
    code === '' && (setErrorOtp(false), setCode(''));
  }, [sendOtpCode, code]);

  return {
    inputRef,
    code,
    setCode,
    errorOtp,
    setErrorOtp,
    sendOtpCode,
    setSendOtpCode,
    counter,
    setCounter
  };
};

export {otpHook};
