import {StackNavigation} from '@src/types/globalTypes';
type DrawerType = 'permanent' | 'front';

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
  const type: DrawerType = width
    ? width >= 768
      ? 'permanent'
      : 'front'
    : 'front';

  console.log('visible', visible);
  console.log('transparent', transparent);

  navigation.getParent()?.setOptions({
    headerShown: visible,
    headerTransparent: transparent,
    headerTintColor: titleColor,
    drawerType: type,
    swipeEnabled: width ? true : false
  });
};
