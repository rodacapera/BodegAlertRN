import {useNavigation} from '@react-navigation/native';
import {actualTheme} from '@src/types/contextTypes';
import {type StackNavigation} from '@src/types/globalTypes';
import {LoginButtonsProps} from '@src/types/loginTypes';
import {t} from 'i18next';
import {View} from 'react-native';
import {Button} from 'react-native-paper';
import {loginFormStyles} from '../styles/loginFormStyles';

const Buttons = ({setButtonAction, currentButtonAction}: LoginButtonsProps) => {
  const {navigate} = useNavigation<StackNavigation>();
  const {colors, theme} = actualTheme();

  return (
    <View style={loginFormStyles.loginButtonsContainer}>
      <View style={loginFormStyles.buttonLogin}>
        <Button
          style={loginFormStyles.button}
          textColor="white"
          buttonColor={
            theme.dark ? colors.primaryContainer : colors.onPrimaryContainer
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
            theme.dark ? colors.primaryContainer : colors.onPrimaryContainer
          }
          icon="qrcode"
          mode="contained"
          onPress={() => console.log('Register')}>
          {t('loginView.scanButton')}
        </Button>
      </View>
      <Button
        mode="text"
        textColor={colors.onSurface}
        onPress={() => navigate('Register', {administrator: true})}>
        {t('loginView.signUp')}
      </Button>
    </View>
  );
};

export default Buttons;
