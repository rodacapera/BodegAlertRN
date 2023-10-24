import {FirebaseFirestoreTypes} from '@react-native-firebase/firestore';

export type Button = {
  isValid: boolean;
  connected: boolean;
  ip: string;
};

export interface Buttons {
  body: string;
  cost: number;
  date: string;
  name: string;
  reference: string;
  shop?: FirebaseFirestoreTypes.DocumentReference;
  uid: string;
  isd: string;
  pass: string;
  server: string;
}

export type ButtonFind = {
  isValid: boolean;
  connected: boolean;
  ip: string;
} | null;

export type ButtonsModalProps = {
  visible: boolean;
  setVisible: (e: boolean) => void;
  buttons: Buttons[];
  buttonFind?: ButtonFind | undefined;
  setButtonFind: (e: ButtonFind | undefined) => void;
  setNewButtons: (e: Buttons[]) => void;
};
