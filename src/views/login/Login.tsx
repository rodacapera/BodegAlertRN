import React, {useEffect, useState} from 'react';
import {ImageBackground, SafeAreaView, View} from 'react-native';
import {Text, Avatar} from 'react-native-paper';
import {backgroundStyle} from '@src/globals/styles/screenMode';
import {loginFormStyles} from './styles/loginFormStyles';
import {login_background, logo} from '@src/assets';
import {APP_NAME} from '@src/globals/constants/config';
import LoginForm from './components/LoginForm';
import {buttonActionInitialState} from '@src/globals/constants/login';
import {LoginProps} from '@src/types/globalTypes';
import OtpCode from '@src/components/otp/OtpCode';

const Login = ({route, navigation}: LoginProps) => {
  const [errorPhone, setErrorPhone] = useState(false);
  const [buttonAction, setButtonAction] = useState(buttonActionInitialState);
  const [isLogin, setIsLogin] = useState(false);

  const validatePhoneNumber = () => {
    buttonAction.logged &&
    (buttonAction.phone.length == 2 || buttonAction.phone.length < 10)
      ? setErrorPhone(true)
      : setErrorPhone(false);
  };

  useEffect(() => {
    validatePhoneNumber();
  }, [buttonAction]);

  return (
    <SafeAreaView style={backgroundStyle}>
      <View style={[loginFormStyles.loginContent]}>
        <View style={loginFormStyles.loginHeader}>
          <ImageBackground
            source={login_background}
            resizeMode="cover"
            style={loginFormStyles.image}>
            <Avatar.Image
              style={loginFormStyles.logo}
              size={150}
              source={logo}
            />
            <Text style={loginFormStyles.appName}>{APP_NAME}</Text>
          </ImageBackground>
        </View>
        <View style={loginFormStyles.loginBody}>
          {!isLogin ||
          buttonAction.phone.length == 2 ||
          buttonAction.phone.length < 10 ? (
            <LoginForm
              setButtonAction={setButtonAction}
              errorPhone={errorPhone}
              setIsLogin={setIsLogin}
            />
          ) : (
            <OtpCode
              buttonAction={buttonAction}
              setButtonAction={setButtonAction}
              setIsLogin={setIsLogin}
            />
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Login;
