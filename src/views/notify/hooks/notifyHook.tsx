import {useNavigation} from '@react-navigation/native';
import {HeaderShown} from '@src/hooks/navigator/HeaderShown';
import {GetPanicsQuery} from '@src/reactQuery/NotifyQuery';
import {actualTheme} from '@src/types/contextTypes';
import {StackNavigation} from '@src/types/globalTypes';
import {Panics} from '@src/types/userTypes';
import {useEffect, useState} from 'react';
import {Platform, useColorScheme, useWindowDimensions} from 'react-native';

const NotifyHook = () => {
  const {width} = useWindowDimensions();
  const colorScheme = useColorScheme();
  const {colors, dark} = actualTheme();
  const {data} = GetPanicsQuery();
  const navigation = useNavigation<StackNavigation>();
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    if (data) {
      HeaderShown({
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
  }, [
    navigation,
    data,
    dark,
    width,
    colorScheme,
    colors.onSurface,
    colors.onPrimaryContainer
  ]);

  return {
    panics: data as Panics[],
    setModalVisible,
    modalVisible
  };
};

export {NotifyHook};
