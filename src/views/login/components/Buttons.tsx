import {useNavigation} from '@react-navigation/native';
import {actualTheme} from '@src/types/contextTypes';
import {type StackNavigation} from '@src/types/globalTypes';
import {LoginButtonsProps} from '@src/types/loginTypes';
import {t} from 'i18next';
import {View, useColorScheme} from 'react-native';
import {Button, Text} from 'react-native-paper';
import {loginFormStyles} from '../styles/loginFormStyles';

const Buttons = ({
  setButtonAction,
  currentButtonAction,
  type
}: LoginButtonsProps) => {
  const colorScheme = useColorScheme();
  const {navigate} = useNavigation<StackNavigation>();
  const {colors, dark} = actualTheme();

  return (
    <View style={loginFormStyles.loginButtonsContainer}>
      <View style={loginFormStyles.buttonLogin}>
        <Button
          style={loginFormStyles.button}
          textColor="white"
          buttonColor={
            dark ? colors.primaryContainer : colors.onPrimaryContainer
          }
          icon="login"
          mode="contained"
          onPress={() => setButtonAction(currentButtonAction)}>
          {t('loginView.signIn')}
        </Button>
      </View>
      <View style={loginFormStyles.buttonQr}>
        <Button
          style={loginFormStyles.button}
          textColor="white"
          buttonColor={
            dark ? colors.primaryContainer : colors.onPrimaryContainer
          }
          icon="qrcode"
          mode="contained"
          onPress={() => navigate('QrScanner')}>
          {t('loginView.scanButton')}
        </Button>
      </View>
      <Button
        mode="text"
        textColor={dark ? colors.onSurface : colors.onSurface}
        onPress={() => navigate('Register', {administrator: true, type})}>
        <Text
          style={{
            borderBottomWidth: 1,
            borderBottomColor: colors.onPrimaryContainer
          }}>
          {t('loginView.signUp')}
        </Text>
      </Button>
    </View>
  );
};

export default Buttons;
