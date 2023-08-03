import React from 'react';
import {View, Text} from 'react-native';
import {loginFormStyles} from '../styles/loginFormStyles';
import {t} from 'i18next';

const ErrorInputForm = () => {
  return (
    <View style={loginFormStyles.errorContainer}>
      <Text style={loginFormStyles.error}>{t('errorPhone')!}</Text>
    </View>
  );
};

export default ErrorInputForm;
