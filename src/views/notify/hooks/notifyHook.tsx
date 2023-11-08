import {useNavigation} from '@react-navigation/native';
import {headerShown} from '@src/hooks/navigator/headerShown';
import {getPanicsQuery} from '@src/reactQuery/NotifyQuery';
import {actualTheme} from '@src/types/contextTypes';
import {StackNavigation} from '@src/types/globalTypes';
import {Panics} from '@src/types/userTypes';
import {useEffect, useState} from 'react';
import {Platform, useColorScheme, useWindowDimensions} from 'react-native';

const NotifyHook = () => {
  const {width} = useWindowDimensions();
  const colorScheme = useColorScheme();
  const {colors, dark} = actualTheme();
  const {data} = getPanicsQuery();
  const navigation = useNavigation<StackNavigation>();
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    if (data) {
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
  }, [data, dark]);

  return {
    panics: data as Panics[],
    setModalVisible,
    modalVisible
  };
};

export {NotifyHook};
