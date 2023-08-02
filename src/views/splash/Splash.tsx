import React, {useEffect} from 'react';
import {Text} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Image, View} from 'react-native';
import {backgroundStyle} from '@src/globals/styles/screenMode';
import {logo} from '@src/assets';
import {splashStyles} from './styles/splashStyles';
import {useTranslation} from 'react-i18next';
import {APP_NAME_END, APP_NAME_FIRST} from '@src/globals/constants/config';
import splashHook from '@src/hooks/splash/splashHook';
import {SplashProps} from '@src/types/globalTypes';
const Splash = ({route, navigation}: SplashProps) => {
  const {i18n, t} = useTranslation();

  useEffect(() => {
    setTimeout(() => {
      splashHook({route, navigation});
    }, 1000);
  }, []);

  return (
    <SafeAreaView style={backgroundStyle}>
      <View style={splashStyles.container}>
        <View style={splashStyles.imgContent}>
          <Image source={logo} style={splashStyles.logo} />
          <Text style={splashStyles.textLogoInit}>
            {APP_NAME_FIRST}
            <Text style={splashStyles.textLogoFin}>{APP_NAME_END}</Text>
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Splash;
