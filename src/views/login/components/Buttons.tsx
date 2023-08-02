import React from 'react';
import {View} from 'react-native';
import {LoginFormAction} from '@src/types/loginTypes';
import {loginFormStyles} from '../styles/loginFormStyles';
import {Button} from 'react-native-paper';
import {lightTheme} from '@src/hooks/lightMode';
import CustomIcon from '@src/components/customIcon/CustomIcon';
import {useNavigation} from '@react-navigation/native';
import {type StackNavigation} from '@src/types/globalTypes';
import {t} from 'i18next';
import {isDarkMode} from '@src/globals/styles/screenMode';
import {darkTheme} from '@src/hooks/darkMode';

const Buttons = ({
  setButtonAction,
  currentButtonAction,
  setIsLogin,
}: {
  setButtonAction: (e: LoginFormAction) => void;
  currentButtonAction: LoginFormAction;
  setIsLogin: (e: boolean) => void;
}) => {
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
          // icon={() => <CustomIcon name={'camera'} color="white" />}
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
          icon={() => (
            <CustomIcon font="awesome" name={'qrcode'} color="white" />
          )}
          mode="contained"
          onPress={() => console.log('Register')}>
          {t('scanButton')}
        </Button>
      </View>
      <Button
        textColor={
          isDarkMode ? darkTheme.colors.primary : lightTheme.colors.primary
        }
        mode="text"
        onPress={() => navigate('Register')}>
        {t('signUp')}
      </Button>
    </View>
  );
};

export default Buttons;
