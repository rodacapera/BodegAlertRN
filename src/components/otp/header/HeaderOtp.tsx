import React from 'react';
import {handleBack} from '@src/components/otp/hooks/otpHooks';
import {HeaderOtpParams} from '@src/types/otptypes';
import {Text, View} from 'react-native';
import {Button} from 'react-native-paper';
import {otpStyles} from '../styles/otpStyles';
import {t} from 'i18next';

const HeaderOtp = ({setButtonAction, setIsLogin, setCode}: HeaderOtpParams) => {
  return (
    <View style={otpStyles.headerOtp}>
      <View style={otpStyles.contentBackButtonOtp}>
        <Button
          icon="arrow-left"
          mode="text"
          onPress={() => handleBack(setButtonAction, setIsLogin, setCode)}>
          {t('back')}
        </Button>
      </View>
      <View style={otpStyles.contentTitleOtp}>
        <Text style={otpStyles.titleOtp}>
          {t('titleOtp')} {'\n'}
        </Text>
        <Text style={otpStyles.subTitleOtp}>{t('subTitleOtp')}</Text>
      </View>
    </View>
  );
};

export default HeaderOtp;
