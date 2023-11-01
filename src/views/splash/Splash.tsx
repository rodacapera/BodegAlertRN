import {logo_app} from '@src/assets/images';
import {APP_NAME_END, APP_NAME_FIRST} from '@src/globals/constants/config';
import {backgroundStyle} from '@src/globals/styles/screenMode';
import splashHook from '@src/hooks/splash/splashHook';
import {actualTheme} from '@src/types/contextTypes';
import {SplashProps} from '@src/types/globalTypes';
import {useEffect} from 'react';
import {useTranslation} from 'react-i18next';
import {Image, StatusBar, View, useColorScheme} from 'react-native';
import {Text} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';
import {splashStyles} from './styles/splashStyles';
const Splash = ({route, navigation}: SplashProps) => {
  const colorScheme = useColorScheme();
  const {i18n, t} = useTranslation();
  const {colors, theme, dark} = actualTheme();

  useEffect(() => {
    setTimeout(() => {
      splashHook({route, navigation});
    }, 1000);
  }, []);

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
