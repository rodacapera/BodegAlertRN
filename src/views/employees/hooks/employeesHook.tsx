import {useNavigation} from '@react-navigation/native';
import {headerShown} from '@src/hooks/navigator/headerShown';
import {useGetUser} from '@src/hooks/user/useGetUser';
import {actualTheme} from '@src/types/contextTypes';
import {StackNavigation} from '@src/types/globalTypes';
import {useEffect, useState} from 'react';
import {getEmployeesQuery} from '@src/reactQuery/userQuery';
import {User} from '@src/types/userTypes';

const employeesHook = () => {
  const navigation = useNavigation<StackNavigation>();
  const {data} = getEmployeesQuery();
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
    setAlertVisible
  };
};

export {employeesHook};
