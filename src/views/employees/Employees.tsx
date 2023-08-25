import {user_not_found} from '@src/assets/images';
import {EmployeesProps} from '@src/types/globalTypes';
import {SafeAreaView, StyleProp, Text, View, ViewStyle} from 'react-native';
import {employeeStyles} from './styles/employeesStyles';
import CustomImage from '@src/components/customImage/CustomImage';
import {backgroundStyle} from '@src/globals/styles/screenMode';
import {t} from 'i18next';
import {Image} from 'react-native';
import {Banner, Caption, Title} from 'react-native-paper';
import {useContext, useEffect, useState} from 'react';
import {ThemeContext} from '@src/types/contextTypes';
import SimpleRemoveItemCards from '@src/components/simpleRemoveItemCards/SimpleRemoveItemCards';
import {employees} from '@src/globals/constants/fakeData';
import CustomBanner from '@src/components/customBanner/CustomBanner';
import CustomFab from '@src/components/customFab/CustomFabA';
import UsersNotFound from './components/UsersNotFound';

const Employees = ({navigation, route}: EmployeesProps) => {
  const [myEmployees, setMyEmployees] =
    useState<{title: string; subtitle: string}[]>(employees);
  const {
    theme,
    theme: {colors},
  } = useContext(ThemeContext);
  const [fabActionButton, setFabActionButton] = useState<boolean>(false);

  const removeItem = (index: number) => {
    console.log('remove item', index);
  };

  useEffect(() => {
    console.log('fabActionButton', fabActionButton);
  }, [fabActionButton]);

  useEffect(() => {
    // const resultEmployees = getEmployees();
    // setEmployees(resultEmployees);
  }, []);
  // icon="account-group-outline"

  return (
    <SafeAreaView style={backgroundStyle}>
      <CustomBanner visible={true} />
      <View style={employeeStyles.container}>
        {myEmployees.length > 0 ? (
          myEmployees.map((value, index) => {
            return (
              <SimpleRemoveItemCards
                title={value.title}
                index={index}
                subtitle={value.subtitle}
                removeItem={removeItem}
                key={index}
              />
            );
          })
        ) : (
          <UsersNotFound />
        )}
        <CustomFab icon="account-plus-outline" onPress={setFabActionButton} />
      </View>
    </SafeAreaView>
  );
};

export default Employees;
