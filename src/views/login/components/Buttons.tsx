import {useNavigation} from '@react-navigation/native';
import {ThemeContext} from '@src/types/contextTypes';
import {type StackNavigation} from '@src/types/globalTypes';
import {LoginButtonsProps} from '@src/types/loginTypes';
import {t} from 'i18next';
import {useContext} from 'react';
import {View} from 'react-native';
import {Button} from 'react-native-paper';
import {loginFormStyles} from '../styles/loginFormStyles';

const Buttons = ({
  setButtonAction,
  currentButtonAction,
  setIsLogin,
}: LoginButtonsProps) => {
  const {navigate} = useNavigation<StackNavigation>();
  const {
    theme,
    theme: {colors},
  } = useContext(ThemeContext);

  const handleLogin = () => {
    setButtonAction(currentButtonAction);
    setIsLogin(true);
  };

  return (
    <View style={loginFormStyles.loginButtonsContainer}>
      <View style={loginFormStyles.buttonLogin}>
        <Button
          style={loginFormStyles.button}
          textColor="white"
          theme={theme}
          // buttonColor={
          //   theme.dark ? colors.primaryContainer : colors.onPrimaryContainer
          // }
          icon="login"
          mode="contained"
          onPress={handleLogin}>
          {t('signIn')}
        </Button>
      </View>
      <View style={loginFormStyles.buttonQr}>
        <Button
          style={loginFormStyles.button}
          textColor="white"
          theme={theme}
          // buttonColor={
          //   theme.dark ? colors.primaryContainer : colors.onPrimaryContainer
          // }
          icon="qrcode"
          mode="contained"
          onPress={() => console.log('Register')}>
          {t('scanButton')}
        </Button>
      </View>
      <Button
        theme={theme}
        // textColor={
        //   theme.dark ? colors.primaryContainer : colors.onPrimaryContainer
        // }
        mode="text"
        onPress={() => navigate('Register', {administrator: true})}>
        {t('signUp')}
      </Button>
    </View>
  );
};

export default Buttons;
