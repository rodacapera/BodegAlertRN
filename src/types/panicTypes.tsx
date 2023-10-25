import {MD3Colors} from 'react-native-paper/lib/typescript/src/types';
import {StackNavigation} from './globalTypes';

export type SendNotificationProps = {
  data: any;
  setLoading: (e: boolean) => void;
  navigation: StackNavigation;
  colors: MD3Colors;
  width: number;
};
