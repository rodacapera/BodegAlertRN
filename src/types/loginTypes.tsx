import {FirebaseAuthTypes} from '@react-native-firebase/auth';
import {RegisterType, SelectedTypes} from './globalTypes';

export type LoginFormAction = {
  name: string;
  show: boolean;
  phone: string;
  logged: boolean;
  confirmation?: FirebaseAuthTypes.ConfirmationResult;
  countryCodeSize: number;
};

export type LoginButtonsProps = {
  setButtonAction: (e: LoginFormAction) => void;
  currentButtonAction: LoginFormAction;
  type?: RegisterType;
};

export type InputFormProps = {
  type: SelectedTypes;
  phoneRef: any;
  setButtonAction: (data: LoginFormAction) => void;
  value?: string;
  code?: string;
  isDisabled?: boolean;
};

export type LoginFormProps = {
  setButtonAction: (e: LoginFormAction) => void;
  errorPhone: boolean;
  currentButtonAction: LoginFormAction;
  setCurrentButtonAction: (e: LoginFormAction) => void;
  type?: RegisterType;
};
