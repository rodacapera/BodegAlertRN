import {backgroundStyle} from '@src/globals/styles/screenMode';
import {headerShown} from '@src/hooks/navigator/headerShown';
import {actualTheme} from '@src/types/contextTypes';
import {ProfileProps} from '@src/types/globalTypes';
import {t} from 'i18next';
import {SafeAreaView, Text, View} from 'react-native';
import UserForm from '../register/forms/UserForm';
import {profileStyles} from './styles/profileStyles';
import {useEffect} from 'react';

const Profile = ({navigation, route}: ProfileProps) => {
  const {colors, dark} = actualTheme();

  useEffect(() => {
    headerShown({
      navigation,
      visible: true,
      transparent: false,
      titleColor: dark ? colors.onSurface : colors.onPrimaryContainer
    });
  });

  return (
    <SafeAreaView style={backgroundStyle}>
      <View style={profileStyles.container}>
        <View style={profileStyles.contentProfileTitle}>
          <Text style={[profileStyles.profileTitle, {color: colors.onSurface}]}>
            {t('profileTitle')}
          </Text>
        </View>
        <UserForm />
      </View>
    </SafeAreaView>
  );
};

export default Profile;
