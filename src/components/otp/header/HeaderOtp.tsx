import {handleBack} from '@src/components/otp/hooks/otpHooks';
import {actualTheme} from '@src/types/contextTypes';
import {HeaderOtpParams} from '@src/types/otptypes';
import {t} from 'i18next';
import {Text, View} from 'react-native';
import {Button} from 'react-native-paper';
import {otpStyles} from '../styles/otpStyles';

const HeaderOtp = ({setButtonAction, setCode, counter}: HeaderOtpParams) => {
  const {colors, theme, dark} = actualTheme();

  return (
    <View style={otpStyles.headerOtp}>
      <View style={otpStyles.contentBackButtonOtp}>
        {counter === 60 && (
          <Button
            icon="arrow-left"
            textColor={dark ? colors.onSurface : colors.onPrimaryContainer}
            style={{backgroundColor: 'transparent'}}
            theme={theme}
            mode="text"
            onPress={() => handleBack(setButtonAction, setCode)}>
            {t('general.back')}
          </Button>
        )}
      </View>
      <View style={otpStyles.contentTitleOtp}>
        <Text
          style={[
            otpStyles.titleOtp,
            {color: theme.dark ? colors.onSurface : colors.outline}
          ]}>
          {t('otp.title')} {'\n'}
        </Text>
        <Text
          style={[
            otpStyles.subTitleOtp,
            {color: theme.dark ? colors.onSurface : colors.outline}
          ]}>
          {t('otp.subTitle')}
        </Text>
      </View>
    </View>
  );
};

export default HeaderOtp;
