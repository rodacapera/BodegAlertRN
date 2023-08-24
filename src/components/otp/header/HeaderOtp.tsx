import React, {useContext} from 'react';
import {handleBack} from '@src/components/otp/hooks/otpHooks';
import {HeaderOtpParams} from '@src/types/otptypes';
import {Text, View} from 'react-native';
import {Button} from 'react-native-paper';
import {otpStyles} from '../styles/otpStyles';
import {t} from 'i18next';
import {ThemeContext} from '@src/types/contextTypes';

const HeaderOtp = ({setButtonAction, setIsLogin, setCode}: HeaderOtpParams) => {
  const {
    theme: {colors},
    theme,
  } = useContext(ThemeContext);
  return (
    <View style={otpStyles.headerOtp}>
      <View style={otpStyles.contentBackButtonOtp}>
        <Button
          icon="arrow-left"
          textColor={
            theme.dark ? colors.primaryContainer : colors.onPrimaryContainer
          }
          style={{backgroundColor: 'transparent'}}
          theme={theme}
          mode="text"
          onPress={() => handleBack(setButtonAction, setIsLogin, setCode)}>
          {t('back')}
        </Button>
      </View>
      <View style={otpStyles.contentTitleOtp}>
        <Text
          style={[
            otpStyles.titleOtp,
            {color: theme.dark ? colors.onPrimary : colors.outline},
          ]}>
          {t('titleOtp')} {'\n'}
        </Text>
        <Text
          style={[
            otpStyles.subTitleOtp,
            {color: theme.dark ? colors.onPrimary : colors.outline},
          ]}>
          {t('subTitleOtp')}
        </Text>
      </View>
    </View>
  );
};

export default HeaderOtp;
