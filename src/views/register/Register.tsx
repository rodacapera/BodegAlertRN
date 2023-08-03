import HeaderTitle from '@src/components/headerTitle/HeaderTitle';
import {backgroundStyle} from '@src/globals/styles/screenMode';
import {RegisterProps} from '@src/types/globalTypes';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import AdminForm from './forms/AdminForm';
import UserForm from './forms/UserForm';
import {registerStyles} from './styles/registerStyles';

const Register = ({navigation, route}: RegisterProps) => {
  const {t} = useTranslation();
  const {administrator} = route.params;
  return (
    <SafeAreaView style={backgroundStyle}>
      <View style={registerStyles.container}>
        <HeaderTitle
          title={
            administrator
              ? t('titleCreateAccountAdmin')
              : t('titleCreateAccountUser')
          }
        />
        {administrator ? <AdminForm /> : <UserForm route={route} />}
      </View>
    </SafeAreaView>
  );
};

export default Register;
