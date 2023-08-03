import {lightTheme} from '@src/hooks/lightMode';
import {StyleSheet} from 'react-native';
import {darkTheme} from '@src/hooks/darkMode';
import {isDarkMode} from '@src/globals/styles/screenMode';
export const headerStyles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    width: '100%',
    marginHorizontal: 20,
    position: 'relative',
    paddingVertical: 10,
    justifyContent: 'center',
  },
  arrowBackIcon: {
    position: 'absolute',
    left: 5,
  },
  title: {
    fontSize: 26,
    width: 280,
    fontWeight: 'bold',
    textTransform: 'capitalize',
    textAlign: 'center',
    color: isDarkMode
      ? darkTheme.colors.primaryContainer
      : lightTheme.colors.onPrimaryContainer,
  },
});
