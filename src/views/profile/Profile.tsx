import {backgroundStyle} from '@src/globals/styles/screenMode';
import {headerShown} from '@src/hooks/navigator/headerShown';
import {actualTheme} from '@src/types/contextTypes';
import {ProfileProps} from '@src/types/globalTypes';
import {t} from 'i18next';
import {SafeAreaView, Text, View} from 'react-native';
import UserForm from '../register/forms/UserForm';
import {profileStyles} from './styles/profileStyles';
import {useEffect} from 'react';
import {profileHook} from './hooks/profileHook';
import CustomBanner from '@src/components/customBanner/CustomBanner';

const Profile = ({navigation, route}: ProfileProps) => {
  const {colors} = actualTheme();
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
