import HeaderTitle from '@src/components/headerTitle/HeaderTitle';
import {backgroundStyle} from '@src/globals/styles/screenMode';
import {RegisterProps} from '@src/types/globalTypes';
import {useTranslation} from 'react-i18next';
import {View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import AdminForm from './forms/AdminForm';
import UserForm from './forms/UserForm';
import {registerStyles} from './styles/registerStyles';

const Register = ({route}: RegisterProps) => {
  const {t} = useTranslation();
  const {administrator, qr, shopId, type} = route.params;

  return (
    <SafeAreaView style={backgroundStyle}>
      <View style={registerStyles.container}>
        <HeaderTitle
          title={
            administrator
              ? t('registerView.titleCreateAccountAdmin')
              : t('registerView.titleCreateAccountUser')
          }
        />
        {administrator ? (
          <AdminForm type={type!} />
        ) : (
          <UserForm qr={qr} shopId={shopId} />
        )}
      </View>
    </SafeAreaView>
  );
};

export default Register;
