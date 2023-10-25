import {useNavigation} from '@react-navigation/native';
import {headerShown} from '@src/hooks/navigator/headerShown';
import {getPanicsQuery} from '@src/reactQuery/notifyQuery';
import {actualTheme} from '@src/types/contextTypes';
import {StackNavigation} from '@src/types/globalTypes';
import {Panics} from '@src/types/userTypes';
import {useEffect, useState} from 'react';
import {Platform, useColorScheme, useWindowDimensions} from 'react-native';

const notifyHook = () => {
  const {width} = useWindowDimensions();
  const colorScheme = useColorScheme();
  const {colors, dark} = actualTheme();
  const {data, isSuccess} = getPanicsQuery();
  const navigation = useNavigation<StackNavigation>();
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    if (isSuccess) {
      headerShown({
        width: width,
        navigation,
        visible: true,
        transparent: false,
        titleColor:
          Platform.OS == 'android'
            ? colorScheme === 'dark'
              ? '#a23234'
              : dark
              ? colors.onSurface
              : colors.onPrimaryContainer
            : colors.onPrimaryContainer
      });
    }
  }, [isSuccess, dark]);

  return {
    panics: data as Panics[],
    setModalVisible,
    modalVisible
  };
};

export {notifyHook};
