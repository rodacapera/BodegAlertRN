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
    marginVertical: 15,
    // borderBottomWidth: 0.7,

    // borderBottomColor: lightTheme.colors.error,
  },
  body: {
    flex: 1,
    marginTop: 10,
  },
  footer: {
    marginTop: 40,
  },
  footerText: {
    marginVertical: 15,
  },
  contentBackButtonRegister: {
    position: 'absolute',
    left: -10,
    top: -30,
    alignItems: 'flex-start',
    zIndex: 99999,
  },
  header: {
    width: '100%',
    marginHorizontal: 20,
    position: 'relative',
  },
});
