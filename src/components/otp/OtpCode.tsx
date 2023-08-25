import {useNavigation} from '@react-navigation/native';
import {
  handleChange,
  handleClear,
  handleSendOtp,
  handleValidateOtp,
  timerCount,
} from '@src/components/otp/hooks/otpHooks';
import {ThemeContext} from '@src/types/contextTypes';
import {StackNavigation} from '@src/types/globalTypes';
import {LoginFormAction} from '@src/types/loginTypes';
import {t} from 'i18next';
import {useContext, useEffect, useRef, useState} from 'react';
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
  const {
    theme: {colors},
    theme,
  } = useContext(ThemeContext);

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
              color: theme.dark ? colors.onSurface : colors.onPrimaryContainer,
            },
          }}
          focusColor={theme.dark ? colors.onSurface : colors.onPrimaryContainer}
          onTextChange={text => handleChange(text, inputRef, setCode)}
          focusStickBlinkingDuration={500}
        />
        {errorOtp && (
          <Text
            style={[
              otpStyles.errorOtp,
              {
                color: colors.error,
              },
            ]}>
            {t('otp.error')}
          </Text>
        )}
      </View>
      <View style={otpStyles.contentOtpButtons}>
        <Button
          mode="elevated"
          icon={() =>
            sendOtpCode && (
              <Text
                style={{
                  color: theme.dark
                    ? colors.onSurface
                    : colors.onPrimaryContainer,
                }}>
                {counter}
              </Text>
            )
          }
          theme={theme}
          onPress={() => handleSendOtp(buttonAction, setSendOtpCode)}
          disabled={sendOtpCode}>
          {t('otp.resend')}
        </Button>
        <Button
          theme={theme}
          mode="elevated"
          onPress={() => handleClear(setCode, setErrorOtp, inputRef.current!)}>
          {t('general.clear')}
        </Button>
        <Button
          theme={theme}
          mode="elevated"
          onPress={() => handleValidateOtp(code, navigate, setErrorOtp)}>
          {t('general.verify')}
        </Button>
      </View>
    </View>
  );
};

export default OtpCode;
