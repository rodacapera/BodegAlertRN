import {handleBack} from '@src/components/otp/hooks/otpFunctions';
import {actualTheme} from '@src/types/contextTypes';
import {HeaderOtpParams} from '@src/types/otpTypes';
import {t} from 'i18next';
import {Text, View, useColorScheme} from 'react-native';
import {Button} from 'react-native-paper';
import {otpStyles} from '../styles/otpStyles';
import {useNavigation} from '@react-navigation/native';
import {StackNavigation} from '@src/types/globalTypes';

const HeaderOtp = ({
  setButtonAction,
  setCode,
  counter,
  goBack
}: HeaderOtpParams) => {
  const colorScheme = useColorScheme();
  const navigator = useNavigation<StackNavigation>();
  const {colors, theme, dark} = actualTheme();

  return (
    <View style={otpStyles.headerOtp}>
      <View style={otpStyles.contentBackButtonOtp}>
        {counter === 60 && (
          <Button
            icon="arrow-left"
            textColor={
              colorScheme === 'dark'
                ? colors.surface
                : dark
                ? colors.onSurface
                : colors.onPrimaryContainer
            }
            style={{backgroundColor: 'transparent'}}
            theme={theme}
            mode="text"
            onPress={() => {
              handleBack(setButtonAction, setCode, goBack, navigator);
            }}>
            {t('general.back')}
          </Button>
        )}
      </View>
      <View style={otpStyles.contentTitleOtp}>
        <Text
          style={[
            otpStyles.titleOtp,
            {
              color:
                colorScheme === 'dark'
                  ? colors.surface
                  : dark
                  ? colors.onSurface
                  : colors.outline
            }
          ]}>
          {t('otp.title')} {'\n'}
        </Text>
        <Text
          style={[
            otpStyles.subTitleOtp,
            {
              color:
                colorScheme === 'dark'
                  ? colors.surface
                  : dark
                  ? colors.onSurface
                  : colors.outline
            }
          ]}>
          {t('otp.subTitle')}
        </Text>
      </View>
    </View>
  );
};

export default HeaderOtp;
