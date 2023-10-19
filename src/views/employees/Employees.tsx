import CustomBanner from '@src/components/customBanner/CustomBanner';
import CustomDialogAlert from '@src/components/customDialogAlert/CustomDialogAlert';
import CustomFab from '@src/components/customFab/CustomFab';
import QrModal from '@src/components/qrModal/QrModal';
import SimpleRemoveItemCards from '@src/components/simpleRemoveItemCards/SimpleRemoveItemCards';
import {backgroundStyle} from '@src/globals/styles/screenMode';
import {EmployeesProps} from '@src/types/globalTypes';
import {t} from 'i18next';
import {SafeAreaView, View} from 'react-native';
import UsersNotFound from './components/UsersNotFound';
import {employeesHook} from './hooks/employeesHook';
import {employeeStyles} from './styles/employeesStyles';
import CustomLoadingOverlay from '@src/components/customLoadingOverlay/CustomLoadingOverlay';

const Employees = ({navigation, route}: EmployeesProps) => {
  const {
    employees,
    visible,
    setVisible,
    alertVisible,
    removeItem,
    setAlertVisible,
    isLoading
  } = employeesHook();

  return isLoading ? (
    <CustomLoadingOverlay visible />
  ) : (
    <SafeAreaView style={backgroundStyle}>
      <CustomBanner
        visible={true}
        text={t('employeesView.banner')}
        icon="account-group-outline"
      />
      <View style={employeeStyles.container}>
        {employees.length < 1 && <UsersNotFound />}
        {employees.map(
          (value, index) =>
            !value.administrator && (
              <SimpleRemoveItemCards
                titleCard={`${value.name} ${value.lastname}`}
                subtitleCard={value.alias}
                index={index}
                removeItem={removeItem}
                key={index}
              />
            )
        )}
      </View>
      <CustomFab
        position="bottomRight"
        icon="account-plus-outline"
        onPress={() => setVisible(true)}
      />

      <CustomDialogAlert
        visible={alertVisible}
        setVisible={setAlertVisible}
        cancelButton
        title={t('employeesView.alertTitleErrorDeleteUser')}
        description={t('employeesView.alertDescriptionErrorDeleteUser')}
      />
      <QrModal visible={visible} setVisible={setVisible} />
    </SafeAreaView>
  );
};

export default Employees;
