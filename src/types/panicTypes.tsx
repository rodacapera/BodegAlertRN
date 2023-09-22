import {NavigationProp} from '@react-navigation/native';
import {StackNavigation} from './globalTypes';

export type SendNotificationProps = {
  data: any;
  setLoading: (e: boolean) => void;
  navigation: StackNavigation;
};
