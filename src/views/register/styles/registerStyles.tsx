import {StyleSheet} from 'react-native';
import {darkTheme} from '@src/hooks/darkMode';
import {lightTheme} from '@src/hooks/lightMode';
import {isDarkMode} from '@src/globals/styles/screenMode';

export const registerStyles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
    alignItems: 'center',
    // backgroundColor: 'red',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: isDarkMode
      ? darkTheme.colors.onPrimaryContainer
      : lightTheme.colors.primary,
  },
  input: {
    width: 280,
    backgroundColor: 'transparent',
    // borderBottomWidth: 0.7,

    // borderBottomColor: lightTheme.colors.error,
  },
});
