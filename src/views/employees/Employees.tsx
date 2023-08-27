import CustomBanner from '@src/components/customBanner/CustomBanner';
import CustomFab from '@src/components/customFab/CustomFabA';
import QrModal from '@src/components/qrModal/QrModal';
import SimpleRemoveItemCards from '@src/components/simpleRemoveItemCards/SimpleRemoveItemCards';
import {backgroundStyle} from '@src/globals/styles/screenMode';
import {EmployeesProps} from '@src/types/globalTypes';
import {useState} from 'react';
import {SafeAreaView, View} from 'react-native';
import UsersNotFound from './components/UsersNotFound';
import {employeeStyles} from './styles/employeesStyles';
import CustomDialogAlert from '@src/components/customDialogAlert/CustomDialogAlert';
import {t} from 'i18next';
import {employees} from '../../globals/constants/fakeData';

const Employees = ({navigation, route}: EmployeesProps) => {
  const [visible, setVisible] = useState(false);
  const [alertVisible, setAlertVisible] = useState(false);
  const [myEmployees, setMyEmployees] =
    useState<{title: string; subtitle: string}[]>(employees); // employees

  const removeItem = (index: number) => {
    console.log('remove item', index);
    setAlertVisible(true);
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <CustomDialogAlert
        visible={alertVisible}
        setVisible={setAlertVisible}
        cancelButton
        title={t('employeesView.alertTitleErrorDeleteUser')}
        description={t('employeesView.alertDescriptionErrorDeleteUser')}
      />
      <CustomBanner visible={myEmployees.length > 0 ? true : false} />
      <View style={employeeStyles.container}>
        {myEmployees.length == 0 && <UsersNotFound />}
        {myEmployees.map((value, index) => (
          <SimpleRemoveItemCards
            title={value.title}
            index={index}
            subtitle={value.subtitle}
            removeItem={removeItem}
            key={index}
          />
        ))}
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
