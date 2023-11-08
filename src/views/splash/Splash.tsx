import {useNavigation} from '@react-navigation/native';
import {logo_app} from '@src/assets/images';
import {APP_NAME_END, APP_NAME_FIRST} from '@src/globals/constants/config';
import {backgroundStyle} from '@src/globals/styles/screenMode';
import {HeaderShown} from '@src/hooks/navigator/HeaderShown';
import SplashHook from '@src/hooks/splash/SplashHook';
import {actualTheme} from '@src/types/contextTypes';
import {StackNavigation} from '@src/types/globalTypes';
import {useEffect} from 'react';
import {Image, StatusBar, View, useColorScheme} from 'react-native';
import {Text} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';
import {splashStyles} from './styles/splashStyles';
const Splash = () => {
  const colorScheme = useColorScheme();
  const {colors, theme, dark} = actualTheme();
  const navigator = useNavigation<StackNavigation>();

  useEffect(() => {
    setTimeout(() => {
      SplashHook({navigator});
    }, 2000);
  }, [navigator]);

  useEffect(() => {
    HeaderShown({
      navigation: navigator,
      visible: false,
      transparent: false
    });
  }, [navigator]);

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        backgroundColor={
          colorScheme == 'dark'
            ? colors.onPrimaryContainer
            : dark
            ? colors.onPrimary
            : colors.primaryContainer
        }
        animated={true}
        barStyle={
          colorScheme == 'dark'
            ? 'light-content'
            : dark
            ? 'light-content'
            : 'dark-content'
        }
      />
      <View style={splashStyles.container}>
        <View style={splashStyles.imgContent}>
          <Image source={logo_app} style={splashStyles.logo} />
          <Text
            style={[
              splashStyles.textLogoInit,
              {color: theme.dark ? colors.onPrimaryContainer : colors.primary}
            ]}>
            {APP_NAME_FIRST}
            <Text
              style={[
                splashStyles.textLogoFin,
                {
                  color: theme.dark ? colors.inversePrimary : colors.primary
                }
              ]}>
              {APP_NAME_END}
            </Text>
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Splash;
