import {NavigationProp} from '@react-navigation/native';
import {StackNavigation} from '@src/types/globalTypes';

export const headerShown = ({
  navigation,
  visible,
  transparent,
  titleColor
}: {
  navigation: StackNavigation;
  visible: boolean;
  transparent: boolean;
  titleColor?: string;
}) => {
  navigation.getParent()?.setOptions({
    headerShown: visible,
    headerTransparent: transparent,
    headerTintColor: titleColor
  });
};
