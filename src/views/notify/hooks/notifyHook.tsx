import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {headerShown} from '@src/hooks/navigator/headerShown';
import {getUserQuery} from '@src/reactQuery/userQuery';
import {GetUserData} from '@src/types/auth';
import {actualTheme} from '@src/types/contextTypes';
import {StackNavigation} from '@src/types/globalTypes';
import {Panics} from '@src/types/userTypes';
import {useEffect, useState} from 'react';

const notifyHook = () => {
  const {colors, dark} = actualTheme();
  const {data, isSuccess} = getUserQuery();
  const {panicsObserver} = data as GetUserData;
  const navigation = useNavigation<StackNavigation>();
  const [panics, setPanics] = useState<Panics[]>([]);
  const [modalVisible, setModalVisible] = useState(false);

  const resultPanics = (documentSnapshot: any) => {
    documentSnapshot.forEach((value: {data: () => Panics}) => {
      const data = value.data();
      setPanics(prev => [...prev, data]);
    });
  };

  useEffect(() => {
    if (isSuccess) {
      headerShown({
        navigation,
        visible: true,
        transparent: false,
        titleColor: dark ? colors.onSurface : colors.onPrimaryContainer
      });
      const panicObserver = panicsObserver.onSnapshot(
        (documentSnapshot: any) => {
          resultPanics(documentSnapshot);
        }
      );
      return () => panicObserver();
    }
  }, [isSuccess, dark]);
  return {
    panics,
    setModalVisible,
    modalVisible
  };
};

export {notifyHook};
