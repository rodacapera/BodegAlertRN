import {login_background, logo_app} from '@src/assets/images';
import OtpCode from '@src/components/otp/OtpCode';
import {APP_NAME} from '@src/globals/constants/config';
import {backgroundStyle} from '@src/globals/styles/screenMode';
import {LoginParams, LoginProps, StackNavigation} from '@src/types/globalTypes';
import {ImageBackground, SafeAreaView, ScrollView, View} from 'react-native';
import {Avatar, Button, Text} from 'react-native-paper';
import LoginForm from './components/LoginForm';
import {loginHook} from './hooks/loginHook';
import {loginFormStyles} from './styles/loginFormStyles';
import {actualTheme} from '@src/types/contextTypes';
import {useNavigation} from '@react-navigation/native';
import {t} from 'i18next';

const Login = ({route, navigation}: LoginProps) => {
  const params = route.params;
  const {navigate, goBack} = useNavigation<StackNavigation>();
  const {theme} = actualTheme();
  const {
    buttonAction,
    setButtonAction,
    errorPhone,
    currentButtonAction,
    validateRegEx,
    setCurrentButtonAction
  } = loginHook(params?.data);

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
              <Button
                icon="arrow-left"
                textColor={'white'}
                style={loginFormStyles.bacKButton}
                theme={theme}
                mode="text"
                onPress={() => goBack()}>
                {t('general.back')}
              </Button>
            </ImageBackground>
          </View>
          <View style={loginFormStyles.loginBody}>
            {!params?.qr &&
            (buttonAction.phone.length == 2 || !validateRegEx()) ? (
              <LoginForm
                setButtonAction={setButtonAction}
                errorPhone={errorPhone}
                currentButtonAction={currentButtonAction}
                setCurrentButtonAction={setCurrentButtonAction}
                type={params?.type}
              />
            ) : (
              <OtpCode
                buttonAction={buttonAction}
                setButtonAction={setButtonAction}
                data={params?.data}
              />
            )}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Login;
