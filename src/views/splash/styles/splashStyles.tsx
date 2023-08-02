import {StyleSheet} from 'react-native';
import {darkTheme} from '@src/hooks/darkMode';
import {lightTheme} from '@src/hooks/lightMode';
import {isDarkMode} from '@src/globals/styles/screenMode';

export const splashStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imgContent: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 200,
    height: 200,
  },
  textLogoInit: {
    fontSize: 30,
    textTransform: 'uppercase',
    color: isDarkMode
      ? darkTheme.colors.onPrimaryContainer
      : lightTheme.colors.primary,
  },
  textLogoFin: {
    fontWeight: 'bold',
    color: isDarkMode
      ? darkTheme.colors.inversePrimary
      : lightTheme.colors.primary,
  },
});
