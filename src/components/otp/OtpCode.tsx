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
import {User} from '@src/types/userTypes';
import {t} from 'i18next';
import {View, useColorScheme, Platform} from 'react-native';
import {OtpInput, OtpInputRef} from 'react-native-otp-entry';
import {Button, Text} from 'react-native-paper';
import CustomDialogAlert from '../customDialogAlert/CustomDialogAlert';
import HeaderOtp from './header/HeaderOtp';
import {otpHook} from './hooks/otpHook';
import {otpStyles} from './styles/otpStyles';
import {backgroundStyle} from '@src/globals/styles/screenMode';

const OtpCode = ({
  buttonAction,
  setButtonAction,
  data
}: {
  buttonAction: LoginFormAction;
  setButtonAction: (e: LoginFormAction) => void;
  data?: User;
}) => {
  const colorScheme = useColorScheme();
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
    setErrorNetwork,
    isLoadingValidateOtp,
    setIsLoadingValidateOtp,
    isCodeRequested
  } = otpHook({
    buttonAction
  });

  return (
    <View style={[otpStyles.containerOtp]}>
      <HeaderOtp
        setButtonAction={setButtonAction}
        setCode={setCode}
        counter={counter}
        goBack={data ? true : false}
      />
      <CustomDialogAlert
        visible={errorNetwork}
        setVisible={() => (setErrorNetwork(false), navigation.goBack())}
        title={t('network.alertErrorTitle')}
        description={t('network.alertErrorDescription')}
      />

      <View style={otpStyles.contentOtpInput}>
        <OtpInput
          ref={(e: OtpInputRef) => (inputRef.current = e)}
          numberOfDigits={6}
          theme={{
            pinCodeTextStyle: {
              color: dark ? colors.onSurface : colors.onPrimaryContainer
            },
            pinCodeContainerStyle: {
              borderColor: dark ? colors.onSurface : colors.onPrimaryContainer
            }
          }}
          focusColor={dark ? colors.onSurface : colors.onPrimaryContainer}
          onTextChange={(text: string) => handleChange(text, inputRef, setCode)}
          focusStickBlinkingDuration={500}
        />
        {errorOtp && (
          <Text
            style={[
              otpStyles.errorOtp,
              {
                color: dark ? colors.onSurface : colors.error
              }
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
                  color: dark ? colors.onSurface : colors.onPrimaryContainer
                }}>
                {counter}
              </Text>
            )
          }
          style={{
            backgroundColor:
              !sendOtpCode && dark
                ? colors.onSurfaceDisabled
                : colors.elevation.level1
          }}
          theme={{
            colors: {
              primary:
                colorScheme == 'dark'
                  ? colors.primary
                  : dark
                  ? colors.onSurface
                  : colors.primary,

              onSurfaceDisabled: !sendOtpCode
                ? colors.onSurfaceVariant
                : colors.surfaceVariant
            }
          }}
          onPress={() => handleSendOtp(buttonAction, setSendOtpCode)}
          disabled={isCodeRequested ?? sendOtpCode}>
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
          disabled={isLoadingValidateOtp}
          onPress={() =>
            handleValidateOtp(
              code,
              navigation,
              setErrorOtp,
              buttonAction,
              setButtonAction,
              setCode,
              setIsLoadingValidateOtp,
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
