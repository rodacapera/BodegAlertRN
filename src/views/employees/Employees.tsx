import CustomBanner from '@src/components/customBanner/CustomBanner';
import CustomFab from '@src/components/customFab/CustomFabA';
import QrModal from '@src/components/qrModal/QrModal';
import SimpleRemoveItemCards from '@src/components/simpleRemoveItemCards/SimpleRemoveItemCards';
import {employees} from '@src/globals/constants/fakeData';
import {backgroundStyle} from '@src/globals/styles/screenMode';
import {ThemeContext} from '@src/types/contextTypes';
import {EmployeesProps} from '@src/types/globalTypes';
import {useContext, useEffect, useState} from 'react';
import {SafeAreaView, View} from 'react-native';
import UsersNotFound from './components/UsersNotFound';
import {employeeStyles} from './styles/employeesStyles';

const Employees = ({navigation, route}: EmployeesProps) => {
  const [visible, setVisible] = useState(false);
  const [myEmployees, setMyEmployees] =
    useState<{title: string; subtitle: string}[]>(employees);
  const {
    theme,
    theme: {colors},
  } = useContext(ThemeContext);

  const removeItem = (index: number) => {
    console.log('remove item', index);
  };

  useEffect(() => {
    // const resultEmployees = getEmployees();
    // setEmployees(resultEmployees);
  }, []);
  // icon="account-group-outline"
  console.log(visible);

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
        <CustomFab
          icon="account-plus-outline"
          onPress={() => setVisible(true)}
        />
      </View>
      <QrModal visible={visible} setVisible={setVisible} />
    </SafeAreaView>
  );
};

export default Employees;
