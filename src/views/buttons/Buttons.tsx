import ButtonsModal from '@src/components/buttonsModal/ButtonsModal';
import CustomBanner from '@src/components/customBanner/CustomBanner';
import CustomDialogAlert from '@src/components/customDialogAlert/CustomDialogAlert';
import CustomFab from '@src/components/customFab/CustomFab';
import SimpleRemoveItemCards from '@src/components/simpleRemoveItemCards/SimpleRemoveItemCards';
import {backgroundStyle} from '@src/globals/styles/screenMode';
import {ButtonsProps} from '@src/types/globalTypes';
import {t} from 'i18next';
import {SafeAreaView, View} from 'react-native';
import UsersNotFound from '../employees/components/UsersNotFound';
import {employeeStyles} from '../employees/styles/employeesStyles';
import {buttonhook} from './hooks/buttonHook';

const Buttons = ({navigation, route}: ButtonsProps) => {
  const {
    alertVisible,
    setAlertVisible,
    removeItem,
    myButtons,
    visible,
    setVisible
  } = buttonhook();

  return (
    <SafeAreaView style={backgroundStyle}>
      <CustomBanner
        visible={myButtons.length > 0 ? true : false}
        text={t('buttonsView.banner')}
        icon="security"
      />
      <View style={employeeStyles.container}>
        {myButtons.length > 0 ? (
          myButtons.map((value, index) => (
            <SimpleRemoveItemCards
              title={value.title}
              index={index}
              subtitle={value.subtitle}
              removeItem={removeItem}
              key={index}
            />
          ))
        ) : (
          <UsersNotFound />
        )}
      </View>
      <CustomFab
        position="bottomRight"
        icon="shield-plus"
        onPress={() => setVisible(true)}
      />

      <CustomDialogAlert
        visible={alertVisible}
        setVisible={setAlertVisible}
        cancelButton
        title={t('buttonsView.alertTitleErrorDeleteUser')}
        description={t('buttonsView.alertDescriptionErrorDeleteUser')}
      />
      <ButtonsModal visible={visible} setVisible={setVisible} />
    </SafeAreaView>
  );
};

export default Buttons;
