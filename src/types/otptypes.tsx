import {LoginFormAction} from './loginTypes';

export type HeaderOtpParams = {
  setButtonAction: (e: LoginFormAction) => void;
  setIsLogin: (e: boolean) => void;
  setCode: (e: string) => void;
};
