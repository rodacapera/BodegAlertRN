import {useNavigation} from '@react-navigation/native';
import {headerShown} from '@src/hooks/navigator/headerShown';
import {getEmployeesQuery} from '@src/reactQuery/userQuery';
import {actualTheme} from '@src/types/contextTypes';
import {StackNavigation} from '@src/types/globalTypes';
import {User} from '@src/types/userTypes';
import {useEffect, useState} from 'react';

const employeesHook = () => {
  const navigation = useNavigation<StackNavigation>();
  const {data, isLoading} = getEmployeesQuery();
  const employees = data as User[];
  const {colors, dark} = actualTheme();
  const [visible, setVisible] = useState(false);
  const [alertVisible, setAlertVisible] = useState(false); // employees

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
    employees,
    visible,
    setVisible,
    alertVisible,
    removeItem,
    setAlertVisible,
    isLoading
  };
};

export {employeesHook};
