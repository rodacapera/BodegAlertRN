import {backgroundStyle} from '@src/globals/styles/screenMode';
import {actualTheme} from '@src/types/contextTypes';
import {ProfileProps} from '@src/types/globalTypes';
import {t} from 'i18next';
import {SafeAreaView, Text, View} from 'react-native';
import UserForm from '../register/forms/UserForm';
import {profileStyles} from './styles/profileStyles';

const Profile = ({navigation, route}: ProfileProps) => {
  const {colors} = actualTheme();
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
