import {useNavigation} from '@react-navigation/native';
import {buttons} from '@src/globals/constants/fakeData';
import {headerShown} from '@src/hooks/navigator/headerShown';
import {actualTheme} from '@src/types/contextTypes';
import {StackNavigation} from '@src/types/globalTypes';
import {useEffect, useState} from 'react';

const buttonhook = () => {
  const {colors, dark} = actualTheme();
  const navigation = useNavigation<StackNavigation>();
  const [alertVisible, setAlertVisible] = useState(false);
  const [visible, setVisible] = useState(false);
  const [myButtons, setMyButtons] =
    useState<{title: string; subtitle: string}[]>(buttons); // get buttons list from bd

  const removeItem = (index: number) => {
    setAlertVisible(true);
  };

  useEffect(() => {
    headerShown({
      navigation,
      visible: true,
      transparent: false,
      titleColor: dark ? colors.onSurface : colors.onPrimaryContainer
    });
  });

  return {
    alertVisible,
    setAlertVisible,
    removeItem,
    myButtons,
    visible,
    setVisible
  };
};
export {buttonhook};
