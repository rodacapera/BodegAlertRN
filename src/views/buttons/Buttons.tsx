import ButtonsModal from '@src/components/buttonsModal/ButtonsModal';
import CustomBanner from '@src/components/customBanner/CustomBanner';
import CustomDialogAlert from '@src/components/customDialogAlert/CustomDialogAlert';
import CustomFab from '@src/components/customFab/CustomFab';
import SimpleRemoveItemCards from '@src/components/simpleRemoveItemCards/SimpleRemoveItemCards';
import {buttons} from '@src/globals/constants/fakeData';
import {backgroundStyle} from '@src/globals/styles/screenMode';
import {ButtonsProps} from '@src/types/globalTypes';
import {t} from 'i18next';
import {useState} from 'react';
import {SafeAreaView, View} from 'react-native';
import UsersNotFound from '../employees/components/UsersNotFound';
import {employeeStyles} from '../employees/styles/employeesStyles';

const Buttons = ({navigation, route}: ButtonsProps) => {
  const [visible, setVisible] = useState(false);
  const [alertVisible, setAlertVisible] = useState(false);
  const [myButtons, setMyButtons] =
    useState<{title: string; subtitle: string}[]>(buttons); // get buttons list from bd

  const removeItem = (index: number) => {
    setAlertVisible(true);
  };

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
        styles="bottomRight"
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
