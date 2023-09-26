import {StackNavigation} from './globalTypes';

export type SendNotificationProps = {
  data: any;
  setLoading: (e: boolean) => void;
  navigation: StackNavigation;
};
