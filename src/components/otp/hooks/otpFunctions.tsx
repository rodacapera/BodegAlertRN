import AsyncStorage from '@react-native-async-storage/async-storage';
import {buttonActionInitialState} from '@src/globals/constants/login';
import {useLoginFirebase} from '@src/hooks/firebase/login/loginWithPhoneNumber';
import {getUserFirebase} from '@src/hooks/firebase/user/user';
import {SetUserAuthParams} from '@src/types/auth';
import {StackNavigation} from '@src/types/globalTypes';
import {LoginFormAction} from '@src/types/loginTypes';
import {User} from '@src/types/userTypes';
import {OtpInputRef} from 'react-native-otp-entry';
let count: any = null;

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
  const setUser = async (user: SetUserAuthParams) => {
    await AsyncStorage.setItem('@userAuth', JSON.stringify(user));
  };

  if (code.length === 6) {
    currentButtonAction.confirmation
      ?.confirm(code)
      .then(async result => {
        if (result) {
          const user = (await getUserFirebase(result.user.uid)) as User;
          const data = {
            uid: result.user.uid,
            user: user
          } as unknown as SetUserAuthParams;
          await setUser(data);
          handleBack(setButtonAction, setCode);
          setErrorOtp(false);
          clearInterval(count);
          count = null;
          navigate('Home', {isLogin: true});
        } else {
          setErrorOtp(true);
        }
      })
      .catch(err => {
        console.debug(err);
        setErrorOtp(true);
      });
  }
};

export const handleSendOtp = async (
  buttonAction: LoginFormAction,
  setSendOtpCode: (e: boolean) => void
) => {
  const confirmation = await useLoginFirebase(buttonAction.phone);
  buttonAction.confirmation = confirmation;
  AsyncStorage.setItem('@otp', JSON.stringify(true));
  setSendOtpCode(true);
};

export const removeOtpCode = async () => {
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
  setSendOtpCode: (e: boolean) => void,
  sendCode: boolean,
  counter: number
) => {
  let newCount = counter;
  if (sendCode) {
    if (!count) {
      count = setInterval(() => {
        if (newCount <= 1) {
          setCounter(60);
          clearInterval(count);
          count = null;
          setSendOtpCode(false);
          removeOtpCode();
        } else {
          newCount = counter--;
          setCounter(newCount);
        }
      }, 1000);
    } else {
      console.log('exist interval');
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
