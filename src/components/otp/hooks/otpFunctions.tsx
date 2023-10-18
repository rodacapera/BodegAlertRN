import AsyncStorage from '@react-native-async-storage/async-storage';
import {buttonActionInitialState} from '@src/globals/constants/login';
import {createShopFirebase} from '@src/hooks/firebase/company/company';
import {useLoginFirebase} from '@src/hooks/firebase/login/loginWithPhoneNumber';
import {
  createUserFirebase,
  getUserFirebase
} from '@src/hooks/firebase/user/user';
import {SetUserAuthParams} from '@src/types/auth';
import {StackNavigation} from '@src/types/globalTypes';
import {LoginFormAction} from '@src/types/loginTypes';
import {Shop, User} from '@src/types/userTypes';
import {OtpInputRef} from 'react-native-otp-entry';
let count: any = null;

export const handleBack = (
  setButtonAction: (e: LoginFormAction) => void,
  setCode: (e: string) => void,
  goBack?: boolean,
  navigator?: StackNavigation
) => {
  if (goBack) {
    buttonActionInitialState.logged = false;
    buttonActionInitialState.phone = '';
    setButtonAction(buttonActionInitialState);
    setCode('');
    navigator?.goBack();
  } else {
    setButtonAction(buttonActionInitialState);
    setCode('');
  }
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
  setCode: (e: string) => void,
  data?: User
) => {
  const setUser = async (user: SetUserAuthParams) => {
    await AsyncStorage.setItem('@userAuth', JSON.stringify(user));
  };

  const loginUser = async (user_uid: string) => {
    //consult user if was created or if exist
    const user = (await getUserFirebase(user_uid)) as User;
    const newUserData = {
      uid: user_uid,
      user: user
    } as unknown as SetUserAuthParams;
    await setUser(newUserData);
    handleBack(setButtonAction, setCode);
    setErrorOtp(false);
    clearInterval(count);
    count = null;
    navigate('Home', {isLogin: true});
  };

  const createShopAndUser = (data: User, newData: User, user_uid: string) => {
    const shop: Shop = {
      address: data.address,
      alias: data.alias,
      city: data.city,
      countryCode: data.countryCode,
      department: data.departament,
      location: data.location,
      nit: '',
      phone: data.phone,
      zipcode: data.zipcode
    };
    createShopFirebase(shop).then(async shopResult => {
      //insert data in shop collection on firestore
      console.log('shopId', shopResult.id);
      newData.user_uid = user_uid;
      newData.shop = `shops/${shopResult.id}`;
      await createUserFirebase(newData); //insert data in user collection on firestore
      await loginUser(user_uid);
    });
  };

  if (code.length === 6) {
    currentButtonAction.confirmation
      ?.confirm(code)
      .then(async result => {
        if (result) {
          if (data) {
            const newData = {...data};
            if (data.shop) {
              newData.user_uid = result.user.uid;
              await createUserFirebase(newData); //insert data in user collection on firestore
              await loginUser(result.user.uid);
            } else {
              createShopAndUser(data, newData, result.user.uid);
            }
          } else {
            await loginUser(result.user.uid);
          }
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
  setSendOtpCode?: (e: boolean) => void
) => {
  const confirmation = await useLoginFirebase(buttonAction.phone);
  buttonAction.confirmation = confirmation;
  AsyncStorage.setItem('@otp', JSON.stringify(true));
  setSendOtpCode && setSendOtpCode(true);
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
