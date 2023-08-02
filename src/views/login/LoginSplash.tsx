import React from 'react';
import {ImageBackground, SafeAreaView, View} from 'react-native';
import {Button, Text} from 'react-native-paper';
import {backgroundStyle} from '../../globals/styles/screenMode';
import {loginStyles} from './styles/loginStyles';
import {APP_NAME_END, APP_NAME_FIRST} from '@src/globals/constants/config';
import {login_background} from '@src/assets';
import {lightTheme} from '@src/hooks/lightMode';
import {LoginSplashProps} from '@src/types/globalTypes';
import {t} from 'i18next';

const LoginSplash = ({route, navigation}: LoginSplashProps) => {
  return (
    <SafeAreaView style={backgroundStyle}>
      <ImageBackground
        source={login_background}
        resizeMode="cover"
        style={loginStyles.image}>
        <View style={[loginStyles.content]}>
          <View style={loginStyles.header}>
            <Text style={loginStyles.title}>
              {t('welcome')} {'! \n'}
              <Text style={loginStyles.appNameInit}>
                {APP_NAME_FIRST}
                <Text style={loginStyles.appNameEnd}>{APP_NAME_END}</Text>
              </Text>
            </Text>
          </View>
          <View style={loginStyles.descriptionContainer}>
            <Text style={loginStyles.loginDescription}>
              {t('loginDescription')}
            </Text>
          </View>
          <View style={loginStyles.footer}>
            <View style={loginStyles.buttonContainer}>
              <Button
                style={loginStyles.button}
                textColor="white"
                buttonColor={lightTheme.colors.onPrimaryContainer}
                // icon={() => <CustomIcon name={'camera'} color="white" />}
                mode="contained"
                onPress={() => navigation.navigate('Login')}>
                {t('continue')}
              </Button>
            </View>
          </View>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default LoginSplash;
