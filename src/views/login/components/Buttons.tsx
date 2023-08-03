import {useNavigation} from '@react-navigation/native';
import {isDarkMode} from '@src/globals/styles/screenMode';
import {darkTheme} from '@src/hooks/darkMode';
import {lightTheme} from '@src/hooks/lightMode';
import {type StackNavigation} from '@src/types/globalTypes';
import {LoginButtonsProps} from '@src/types/loginTypes';
import {t} from 'i18next';
import React from 'react';
import {View} from 'react-native';
import {Button} from 'react-native-paper';
import {loginFormStyles} from '../styles/loginFormStyles';

const Buttons = ({
  setButtonAction,
  currentButtonAction,
  setIsLogin,
}: LoginButtonsProps) => {
  const {navigate} = useNavigation<StackNavigation>();

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
          buttonColor={
            isDarkMode
              ? darkTheme.colors.primaryContainer
              : lightTheme.colors.onPrimaryContainer
          }
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
          buttonColor={
            isDarkMode
              ? darkTheme.colors.primaryContainer
              : lightTheme.colors.onPrimaryContainer
          }
          icon="qrcode"
          mode="contained"
          onPress={() => console.log('Register')}>
          {t('scanButton')}
        </Button>
      </View>
      <Button
        textColor={
          isDarkMode
            ? darkTheme.colors.primaryContainer
            : lightTheme.colors.onPrimaryContainer
        }
        mode="text"
        onPress={() => navigate('Register', {administrator: false})}>
        {t('signUp')}
      </Button>
    </View>
  );
};

export default Buttons;
