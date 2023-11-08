import {useNavigation} from '@react-navigation/native';
import {login_background, logo_app} from '@src/assets/images';
import ErrorInputForm from '@src/components/customErrorInputForm/CustomErrorInputForm';
import CustomLoadingOverlay from '@src/components/customLoadingOverlay/CustomLoadingOverlay';
import OtpCode from '@src/components/otp/OtpCode';
import {APP_NAME} from '@src/globals/constants/config';
import {backgroundStyle} from '@src/globals/styles/screenMode';
import {actualTheme} from '@src/types/contextTypes';
import {LoginProps, StackNavigation} from '@src/types/globalTypes';
import {t} from 'i18next';
import {
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  View
} from 'react-native';
import {Avatar, Button, Text} from 'react-native-paper';
import LoginForm from './components/LoginForm';
import {LoginHook} from './hooks/LoginHook';
import {loginFormStyles} from './styles/loginFormStyles';

const Login = ({route}: LoginProps) => {
  const params = route.params;
  const {goBack} = useNavigation<StackNavigation>();
  const {theme} = actualTheme();
  const {
    buttonAction,
    setButtonAction,
    errorPhone,
    currentButtonAction,
    setCurrentButtonAction,
    errorUserNotExist,
    countryCode,
    loadingText
  } = LoginHook(params?.data);

  return (
    <SafeAreaView style={backgroundStyle}>
      <View style={loginFormStyles.loginContent}>
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
          {countryCode ? (
            <ScrollView>
              <View style={loginFormStyles.loginBody}>
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
          ) : (
            <CustomLoadingOverlay visible dots label={loadingText} />
          )}
        </KeyboardAvoidingView>
      </View>
    </SafeAreaView>
  );
};

export default Login;
