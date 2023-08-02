import React from 'react';
import {View, Text} from 'react-native';
import {Button} from 'react-native-paper';
import {otpStyles} from '../styles/otpStyles';
import CustomIcon from '@src/components/customIcon/CustomIcon';
import {isDarkMode} from '@src/globals/styles/screenMode';
import {lightTheme} from '@src/hooks/lightMode';
import {t} from 'i18next';
import {LoginFormAction} from '@src/types/loginTypes';
import {handleBack} from '@src/components/otp/hooks/otpHooks';

const HeaderOtp = ({
  setButtonAction,
  setIsLogin,
  setCode,
}: {
  setButtonAction: (e: LoginFormAction) => void;
  setIsLogin: (e: boolean) => void;
  setCode: (e: string) => void;
}) => {
  const ArrowBackIcon = () => (
    <CustomIcon
      font="material"
      name="arrow-back"
      color={
        isDarkMode
          ? lightTheme.colors.onPrimary
          : lightTheme.colors.onErrorContainer
      }
    />
  );

  return (
    <View style={otpStyles.headerOtp}>
      <View style={otpStyles.contentBackButtonOtp}>
        <Button
          icon={() => <ArrowBackIcon />}
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
