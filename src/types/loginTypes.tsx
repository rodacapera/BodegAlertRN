import {FirebaseAuthTypes} from '@react-native-firebase/auth';
import {SelectedTypes} from './globalTypes';

export type LoginFormAction = {
  name: string;
  show: boolean;
  phone: string;
  logged: boolean;
  confirmation?: FirebaseAuthTypes.ConfirmationResult;
};

export type LoginButtonsProps = {
  setButtonAction: (e: LoginFormAction) => void;
  currentButtonAction: LoginFormAction;
};

export type InputFormProps = {
  type: SelectedTypes;
  phoneRef: any;
  setButtonAction: (data: LoginFormAction) => void;
};

export type LoginFormProps = {
  setButtonAction: (e: LoginFormAction) => void;
  errorPhone: boolean;
  currentButtonAction: LoginFormAction;
  setCurrentButtonAction: (e: LoginFormAction) => void;
};
