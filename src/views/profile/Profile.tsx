import CustomBanner from '@src/components/customBanner/CustomBanner';
import {backgroundStyle} from '@src/globals/styles/screenMode';
import {ProfileProps} from '@src/types/globalTypes';
import {t} from 'i18next';
import {SafeAreaView} from 'react-native';
import UserForm from '../register/forms/UserForm';
import {profileHook} from './hooks/profileHook';

const Profile = ({navigation, route}: ProfileProps) => {
  profileHook();

  return (
    <SafeAreaView style={backgroundStyle}>
      <CustomBanner
        visible={true}
        text={t('profileTitle')}
        icon="account-edit"
      />
      <UserForm />
    </SafeAreaView>
  );
};

export default Profile;
