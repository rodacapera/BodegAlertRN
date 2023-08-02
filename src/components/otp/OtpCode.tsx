import React, {useEffect, useRef, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {isDarkMode} from '@src/globals/styles/screenMode';
import {lightTheme} from '@src/hooks/lightMode';
import {StackNavigation} from '@src/types/globalTypes';
import {LoginFormAction} from '@src/types/loginTypes';
import {
  handleChange,
  handleClear,
  handleSendOtp,
  handleValidateOtp,
  timerCount,
} from '@src/components/otp/hooks/otpHooks';
import {t} from 'i18next';
import {View} from 'react-native';
import {OtpInput, OtpInputRef} from 'react-native-otp-entry';
import {Button, Text} from 'react-native-paper';
import HeaderOtp from './header/HeaderOtp';
import {otpStyles} from './styles/otpStyles';

const OtpCode = ({
  buttonAction,
  setButtonAction,
  setIsLogin,
}: {
  buttonAction: LoginFormAction;
  setButtonAction: (e: LoginFormAction) => void;
  setIsLogin: (e: boolean) => void;
}) => {
  const navigate = useNavigation<StackNavigation>();
  const inputRef = useRef<OtpInputRef>();
  const [code, setCode] = useState('');
  const [errorOtp, setErrorOtp] = useState(false);
  const [sendOtpCode, setSendOtpCode] = useState(false);
  const [counter, setCounter] = useState(60);

  useEffect(() => {
    handleSendOtp(buttonAction, setSendOtpCode);
  }, []);

  useEffect(() => {
    counter === 60 &&
      timerCount(setCounter, setSendOtpCode, sendOtpCode, counter);
    code === '' && (setErrorOtp(false), setCode(''));
  }, [sendOtpCode, code]);

  return (
    <View style={otpStyles.containerOtp}>
      <HeaderOtp
        setButtonAction={setButtonAction}
        setIsLogin={setIsLogin}
        setCode={setCode}
      />
      <View style={otpStyles.contentOtpInput}>
        <OtpInput
          ref={(e: OtpInputRef) => (inputRef.current = e)}
          numberOfDigits={6}
          theme={{
            pinCodeTextStyle: {
              color: isDarkMode
                ? lightTheme.colors.onPrimary
                : lightTheme.colors.onErrorContainer,
            },
          }}
          focusColor={
            isDarkMode
              ? lightTheme.colors.onPrimary
              : lightTheme.colors.onErrorContainer
          }
          onTextChange={text => handleChange(text, inputRef, setCode)}
          focusStickBlinkingDuration={500}
        />
        {errorOtp && <Text style={otpStyles.errorOtp}>{t('errorOtp')}</Text>}
      </View>
      <View style={otpStyles.contentOtpButtons}>
        <Button
          mode="elevated"
          icon={() =>
            sendOtpCode && <Text style={otpStyles.counterOtp}>{counter}</Text>
          }
          onPress={() => handleSendOtp(buttonAction, setSendOtpCode)}
          disabled={sendOtpCode}>
          {t('resendOtp')}
        </Button>
        <Button
          mode="elevated"
          onPress={() => handleClear(setCode, setErrorOtp, inputRef.current!)}>
          {t('clear')}
        </Button>
        <Button
          mode="elevated"
          onPress={() => handleValidateOtp(code, navigate, setErrorOtp)}>
          {t('verify')}
        </Button>
      </View>
    </View>
  );
};

export default OtpCode;
