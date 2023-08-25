import {View, Text} from 'react-native';
import React, {useContext} from 'react';
import CustomImage from '@src/components/customImage/CustomImage';
import {Caption} from 'react-native-paper';
import {t} from 'i18next';
import {user_not_found} from '@src/assets/images';
import {employeeStyles} from '../styles/employeesStyles';
import {ThemeContext} from '@src/types/contextTypes';

const UsersNotFound = () => {
  const {
    theme: {colors},
  } = useContext(ThemeContext);
  return (
    <View>
      <CustomImage source={user_not_found} style={employeeStyles} />
      <Caption
        style={{
          marginTop: 10,
          textAlign: 'center',
          color: colors.onSurface,
        }}>
        {t('employeesView.employeeNotFound')}
      </Caption>
    </View>
  );
};

export default UsersNotFound;
