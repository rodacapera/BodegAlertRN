import {useNavigation} from '@react-navigation/native';
import {
  handleChange,
  handleClear,
  handleSendOtp,
  handleValidateOtp
} from '@src/components/otp/hooks/otpFunctions';
import {actualTheme} from '@src/types/contextTypes';
import {StackNavigation} from '@src/types/globalTypes';
import {LoginFormAction} from '@src/types/loginTypes';
import {t} from 'i18next';
import {View} from 'react-native';
import {OtpInput, OtpInputRef} from 'react-native-otp-entry';
import {Button, Text} from 'react-native-paper';
import HeaderOtp from './header/HeaderOtp';
import {otpHook} from './hooks/otpHook';
import {otpStyles} from './styles/otpStyles';
import {User} from '@src/types/userTypes';
import CustomDialogAlert from '../customDialogAlert/CustomDialogAlert';

const OtpCode = ({
  buttonAction,
  setButtonAction,
  data
}: {
  buttonAction: LoginFormAction;
  setButtonAction: (e: LoginFormAction) => void;
  data?: User;
}) => {
  const navigation = useNavigation<StackNavigation>();
  const {colors, dark, theme} = actualTheme();
  const {
    inputRef,
    code,
    setCode,
    counter,
    errorOtp,
    setErrorOtp,
    sendOtpCode,
    setSendOtpCode,
    errorNetwork,
    setErrorNetwork
  } = otpHook({
    buttonAction
  });

  return (
    <View style={otpStyles.containerOtp}>
      <HeaderOtp
        setButtonAction={setButtonAction}
        setCode={setCode}
        counter={counter}
        goBack={data ? true : false}
      />
      <CustomDialogAlert
        visible={errorNetwork}
        setVisible={() => setErrorNetwork(false)}
        title={'Network Error.'}
        description={'Your current network have not internet access.'}
      />

      <View style={otpStyles.contentOtpInput}>
        <OtpInput
          ref={(e: OtpInputRef) => (inputRef.current = e)}
          numberOfDigits={6}
          theme={{
            pinCodeTextStyle: {
              color: dark ? colors.onSurface : colors.onPrimaryContainer
            }
          }}
          focusColor={dark ? colors.onSurface : colors.onPrimaryContainer}
          onTextChange={(text: string) => handleChange(text, inputRef, setCode)}
          focusStickBlinkingDuration={500}
        />
        {errorOtp && <Text style={otpStyles.errorOtp}>{t('otp.error')}</Text>}
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
                    : colors.onPrimaryContainer
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
          onPress={() =>
            handleValidateOtp(
              code,
              navigation,
              setErrorOtp,
              buttonAction,
              setButtonAction,
              setCode,
              data
            )
          }>
          {t('general.verify')}
        </Button>
      </View>
    </View>
  );
};

export default OtpCode;
