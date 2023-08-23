import {ProfileProps, RegisterProps} from '@src/types/globalTypes';
import {SafeAreaView, Text, View} from 'react-native';
import UserForm from '../register/forms/UserForm';
import {backgroundStyle} from '@src/globals/styles/screenMode';
import {profileStyles} from './styles/profileStyles';
import {t} from 'i18next';
import {Caption, Title} from 'react-native-paper';
import {useContext} from 'react';
import {ThemeContext} from '@src/types/contextTypes';

const Profile = ({navigation, route}: ProfileProps) => {
  const {
    theme: {colors},
  } = useContext(ThemeContext);
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
