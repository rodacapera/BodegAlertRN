import {SelectedTypes} from './globalTypes';

export type LoginFormAction = {
  name: string;
  show: boolean;
  phone: string;
  logged: boolean;
};

export type LoginButtonsProps = {
  setButtonAction: (e: LoginFormAction) => void;
  currentButtonAction: LoginFormAction;
  setIsLogin: (e: boolean) => void;
};

export type InputFormProps = {
  type: SelectedTypes;
  phoneRef: any;
  setButtonAction: (data: LoginFormAction) => void;
};

export type LoginFormProps = {
  setButtonAction: (e: LoginFormAction) => void;
  errorPhone: boolean;
  setIsLogin: (e: boolean) => void;
};
