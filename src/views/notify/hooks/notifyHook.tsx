import {useNavigation} from '@react-navigation/native';
import {headerShown} from '@src/hooks/navigator/headerShown';
import {getPanicsQuery} from '@src/reactQuery/userQuery';
import {actualTheme} from '@src/types/contextTypes';
import {StackNavigation} from '@src/types/globalTypes';
import {useEffect, useState} from 'react';

const notifyHook = () => {
  const {colors, dark} = actualTheme();
  const {data, isSuccess} = getPanicsQuery();
  const navigation = useNavigation<StackNavigation>();
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    if (isSuccess) {
      headerShown({
        navigation,
        visible: true,
        transparent: false,
        titleColor: dark ? colors.onSurface : colors.onPrimaryContainer
      });
    }
  }, [isSuccess, dark]);

  return {
    panics: data,
    setModalVisible,
    modalVisible
  };
};

export {notifyHook};
