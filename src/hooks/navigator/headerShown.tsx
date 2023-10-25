import {StackNavigation} from '@src/types/globalTypes';
export const headerShown = ({
  navigation,
  visible,
  transparent,
  titleColor,
  width
}: {
  navigation: StackNavigation;
  visible: boolean;
  transparent: boolean;
  titleColor?: string;
  width?: number;
}) => {
  navigation.getParent()?.setOptions({
    headerShown: visible,
    headerTransparent: transparent,
    headerTintColor: titleColor,
    drawerType: width && width >= 768 ? 'permanent' : 'front'
  });
};
