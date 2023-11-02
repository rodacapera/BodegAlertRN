import {LoginFormAction} from '@src/types/loginTypes';
import {
  MutableRefObject,
  RefAttributes,
  useEffect,
  useRef,
  useState
} from 'react';
import {OtpInputRef} from 'react-native-otp-entry';
import {getOtp, removeOtpCode, timerCount} from './otpFunctions';

const otpHook = ({buttonAction}: {buttonAction: LoginFormAction}) => {
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
      const sendOtpCode = await getOtp(buttonAction, setSendOtpCode);
      !sendOtpCode ? setErrorNetwork(!sendOtpCode) : setIsCodeRequested(false);
    }
  };

  useEffect(() => {
    initOtp();
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
    setCounter,
    errorNetwork,
    setErrorNetwork,
    isLoadingValidateOtp,
    setIsLoadingValidateOtp,
    isCodeRequested
  };
};

export {otpHook};
