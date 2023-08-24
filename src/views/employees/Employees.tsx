import {user_not_found} from '@src/assets/images';
import {EmployeesProps} from '@src/types/globalTypes';
import {SafeAreaView, StyleProp, Text, View, ViewStyle} from 'react-native';
import {employeeStyles} from './styles/employeesStyles';
import CustomImage from '@src/components/customImage/CustomImage';
import {backgroundStyle} from '@src/globals/styles/screenMode';
import {t} from 'i18next';
import {Caption} from 'react-native-paper';
import {useContext} from 'react';
import {ThemeContext} from '@src/types/contextTypes';

const Employees = ({navigation, route}: EmployeesProps) => {
  const {
    theme: {colors},
  } = useContext(ThemeContext);
  return (
    <SafeAreaView style={backgroundStyle}>
      <View style={{alignItems: 'center', padding: 30}}>
        <CustomImage source={user_not_found} style={employeeStyles} />
        <Caption
          style={{marginTop: 10, textAlign: 'center', color: colors.onSurface}}>
          {t('employeeNotFound')}
        </Caption>
      </View>
    </SafeAreaView>
  );
};

export default Employees;
