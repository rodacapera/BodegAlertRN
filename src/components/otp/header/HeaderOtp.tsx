import {handleBack} from '@src/components/otp/hooks/otpHooks';
import {ThemeContext} from '@src/types/contextTypes';
import {HeaderOtpParams} from '@src/types/otptypes';
import {t} from 'i18next';
import {useContext} from 'react';
import {Text, View} from 'react-native';
import {Button} from 'react-native-paper';
import {otpStyles} from '../styles/otpStyles';

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
          textColor={theme.dark ? colors.onSurface : colors.onPrimaryContainer}
          style={{backgroundColor: 'transparent'}}
          theme={theme}
          mode="text"
          onPress={() => handleBack(setButtonAction, setIsLogin, setCode)}>
          {t('general.back')}
        </Button>
      </View>
      <View style={otpStyles.contentTitleOtp}>
        <Text
          style={[
            otpStyles.titleOtp,
            {color: theme.dark ? colors.onSurface : colors.outline},
          ]}>
          {t('otp.title')} {'\n'}
        </Text>
        <Text
          style={[
            otpStyles.subTitleOtp,
            {color: theme.dark ? colors.onSurface : colors.outline},
          ]}>
          {t('otp.subTitle')}
        </Text>
      </View>
    </View>
  );
};

export default HeaderOtp;
