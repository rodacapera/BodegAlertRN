import {login_background, logo_app} from '@src/assets/images';
import OtpCode from '@src/components/otp/OtpCode';
import {APP_NAME} from '@src/globals/constants/config';
import {backgroundStyle} from '@src/globals/styles/screenMode';
import {LoginProps, StackNavigation} from '@src/types/globalTypes';
import {
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  View,
  useColorScheme
} from 'react-native';
import {Avatar, Button, Text} from 'react-native-paper';
import LoginForm from './components/LoginForm';
import {loginHook} from './hooks/loginHook';
import {loginFormStyles} from './styles/loginFormStyles';
import {actualTheme} from '@src/types/contextTypes';
import {useNavigation} from '@react-navigation/native';
import {t} from 'i18next';
import ErrorInputForm from '@src/components/customErrorInputForm/CustomErrorInputForm';
import {Fragment} from 'react';

const Login = ({route, navigation}: LoginProps) => {
  const colorScheme = useColorScheme();
  const params = route.params;
  const {goBack} = useNavigation<StackNavigation>();
  const {theme, colors, dark} = actualTheme();
  const {
    buttonAction,
    setButtonAction,
    errorPhone,
    currentButtonAction,
    setCurrentButtonAction,
    errorUserNotExist,
    countryCode
  } = loginHook(params?.data);
  console.log('dark', dark);
  console.log('colorScheme', colorScheme);
  return (
    <SafeAreaView style={backgroundStyle}>
      <View
        style={[
          loginFormStyles.loginContent,
          {
            backgroundColor:
              colorScheme == 'dark' ? colors.onBackground : colors.background
          }
        ]}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={{flex: 1}}>
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
              {!params?.qr && (
                <Button
                  icon="arrow-left"
                  textColor={'white'}
                  style={loginFormStyles.bacKButton}
                  theme={theme}
                  mode="text"
                  onPress={() => goBack()}>
                  {t('general.back')}
                </Button>
              )}
            </ImageBackground>
          </View>
          <ScrollView>
            <View
              style={[
                loginFormStyles.loginBody,
                {
                  backgroundColor:
                    colorScheme == 'dark'
                      ? colors.onBackground
                      : colors.background
                }
              ]}>
              {!params?.qr && !buttonAction.logged ? (
                countryCode ? (
                  <LoginForm
                    setButtonAction={setButtonAction}
                    errorPhone={errorPhone}
                    currentButtonAction={currentButtonAction}
                    setCurrentButtonAction={setCurrentButtonAction}
                    type={params?.type}
                    errorUserNotExist={errorUserNotExist}
                    countryCode={countryCode}
                  />
                ) : (
                  <View style={{height: 300}}>
                    <ErrorInputForm
                      error={t('network.alertErrorDescription')}
                    />
                  </View>
                )
              ) : (
                <OtpCode
                  buttonAction={buttonAction}
                  setButtonAction={setButtonAction}
                  data={params?.data}
                />
              )}
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
    </SafeAreaView>
  );
};

export default Login;
