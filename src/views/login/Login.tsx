import React, {useEffect, useState} from 'react';
import {ImageBackground, SafeAreaView, ScrollView, View} from 'react-native';
import {Text, Avatar} from 'react-native-paper';
import {backgroundStyle} from '@src/globals/styles/screenMode';
import {loginFormStyles} from './styles/loginFormStyles';
import {login_background, logo_app} from '@src/assets/images';
import {APP_NAME} from '@src/globals/constants/config';
import LoginForm from './components/LoginForm';
import {buttonActionInitialState} from '@src/globals/constants/login';
import {LoginProps} from '@src/types/globalTypes';
import OtpCode from '@src/components/otp/OtpCode';
import {headerShown} from '@src/hooks/navigator/headerShown';
import {LoginFormAction} from '@src/types/loginTypes';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = ({route, navigation}: LoginProps) => {
  const [errorPhone, setErrorPhone] = useState(false);
  const [buttonAction, setButtonAction] = useState(buttonActionInitialState);
  const [currentButtonAction, setCurrentButtonAction] =
    useState<LoginFormAction>(buttonActionInitialState);

  const validatePhoneNumber = () => {
    buttonAction.logged &&
    (buttonAction.phone.length == 2 || buttonAction.phone.length < 10)
      ? setErrorPhone(true)
      : setErrorPhone(false);
  };

  useEffect(() => {
    validatePhoneNumber();
  }, [buttonAction]);

  useEffect(() => {
    !currentButtonAction.logged &&
      headerShown({
        navigation,
        visible: false,
        transparent: false
      });
  });

  return (
    <SafeAreaView style={backgroundStyle}>
      <ScrollView keyboardShouldPersistTaps="handled">
        <View style={[loginFormStyles.loginContent]}>
          <View style={loginFormStyles.loginHeader}>
            <ImageBackground
              source={login_background}
              resizeMode="cover"
              style={loginFormStyles.image}>
              <Avatar.Image
                style={loginFormStyles.logo}
                size={150}
                source={logo_app}
              />
              <Text style={loginFormStyles.appName}>{APP_NAME}</Text>
            </ImageBackground>
          </View>
          <View style={loginFormStyles.loginBody}>
            {buttonAction.phone.length == 2 ||
            buttonAction.phone.length < 10 ? (
              <LoginForm
                setButtonAction={setButtonAction}
                errorPhone={errorPhone}
                currentButtonAction={currentButtonAction}
                setCurrentButtonAction={setCurrentButtonAction}
              />
            ) : (
              <OtpCode
                buttonAction={buttonAction}
                setButtonAction={setButtonAction}
              />
            )}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Login;
