import {LoginFormAction} from '@src/types/loginTypes';
import {useEffect, useRef, useState} from 'react';
import {OtpInputRef} from 'react-native-otp-entry';
import {getOtp, removeOtpCode, timerCount} from './otpFunctions';
import {useNetInfo} from '@react-native-community/netinfo';

const otpHook = ({buttonAction}: {buttonAction: LoginFormAction}) => {
  const netInfo = useNetInfo();
  const inputRef = useRef<OtpInputRef>();
  const [code, setCode] = useState('');
  const [errorOtp, setErrorOtp] = useState(false);
  const [sendOtpCode, setSendOtpCode] = useState(false);
  const [counter, setCounter] = useState(60);
  const [errorNetwork, setErrorNetwork] = useState(false);
  const [isCodeRequested, setIsCodeRequested] = useState(false);
  const [isLoadingValidateOtp, setIsLoadingValidateOtp] = useState(false);

  const initOtp = async () => {
    setIsCodeRequested(true);
    if (!isCodeRequested) {
      await removeOtpCode();
      getOtp(buttonAction, setSendOtpCode);
    }
  };

  useEffect(() => {
    const statusNetwork = netInfo.isConnected ? true : false;
    statusNetwork && initOtp();
    setErrorNetwork(!statusNetwork);
  }, [netInfo]);

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
    setCounter,
    errorNetwork,
    setErrorNetwork,
    isLoadingValidateOtp,
    setIsLoadingValidateOtp
  };
};

export {otpHook};
