import {useNavigation} from '@react-navigation/native';
import {login_background} from '@src/assets/images';
import {APP_NAME_END, APP_NAME_FIRST} from '@src/globals/constants/config';
import {HeaderShown} from '@src/hooks/navigator/HeaderShown';
import {StackNavigation} from '@src/types/globalTypes';
import {t} from 'i18next';
import {useLayoutEffect} from 'react';
import {
  ImageBackground,
  SafeAreaView,
  View,
  useWindowDimensions
} from 'react-native';
import {Button, Text} from 'react-native-paper';
import {backgroundStyle} from '../../globals/styles/screenMode';
import {loginStyles} from './styles/loginStyles';
import {ActualTheme} from '@src/hooks/navigator/hook/GlobalTheme';

const LoginSplash = () => {
  const {width} = useWindowDimensions();
  const {dark, colors} = ActualTheme();
  const navigation = useNavigation<StackNavigation>();

  useLayoutEffect(() => {
    let isMounted = true;
    isMounted &&
      HeaderShown({
        navigation,
        visible: false,
        transparent: false
      });
    return () => {
      isMounted = false;
    };
  }, [navigation]);

  return (
    <SafeAreaView
      style={[backgroundStyle, {backgroundColor: colors.background}]}>
      <ImageBackground
        source={login_background}
        resizeMode="cover"
        style={loginStyles.image}>
        <View style={loginStyles.content}>
          <View
            style={{
              flex: width >= 768 ? 1 : 2
            }}>
            <Text style={loginStyles.title}>
              {t('loginSplashView.welcome')} {'! \n'}
              <Text style={loginStyles.appNameInit}>
                {APP_NAME_FIRST}
                <Text style={loginStyles.appNameEnd}>{APP_NAME_END}</Text>
              </Text>
            </Text>
          </View>
          <View
            style={[
              loginStyles.descriptionContainer,
              {
                flex: width >= 768 ? 0 : 4,
                marginHorizontal: width >= 768 ? 120 : 0
              }
            ]}>
            <Text style={loginStyles.loginDescription}>
              {t('loginSplashView.description')}
            </Text>
          </View>
          <View style={[loginStyles.footer, {flex: width >= 768 ? 1 : 1}]}>
            <View style={loginStyles.buttonContainer}>
              {/* <Button
                style={loginStyles.button}
                textColor="white"
                buttonColor={
                  dark ? colors.onPrimary : colors.onPrimaryContainer
                }
                icon="bike"
                mode="contained"
                onPress={() => navigation.navigate('Login', {type: 'vehicle'})}>
                {t('general.continueBike')}
              </Button> */}
              <Button
                style={loginStyles.button}
                textColor="white"
                buttonColor={
                  dark ? colors.onPrimary : colors.onPrimaryContainer
                }
                icon="office-building-marker-outline"
                mode="contained"
                onPress={() =>
                  navigation.navigate('Login', {type: 'residence'})
                }>
                {t('general.continueResidence')}
              </Button>
            </View>
          </View>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default LoginSplash;
