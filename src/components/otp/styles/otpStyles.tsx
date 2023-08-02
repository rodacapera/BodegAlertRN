import {lightTheme} from '@src/hooks/lightMode';
import {StyleSheet} from 'react-native';
import {darkTheme} from '@src/hooks/darkMode';
import {isDarkMode} from '@src/globals/styles/screenMode';
export const otpStyles = StyleSheet.create({
  containerOtp: {
    width: '100%',
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  headerOtp: {
    width: '100%',
    marginHorizontal: 20,
    position: 'relative',
  },
  contentBackButtonOtp: {
    position: 'absolute',
    left: -10,
    top: -30,
    alignItems: 'flex-start',
    zIndex: 99999,
  },
  contentTitleOtp: {
    width: '100%',
    paddingHorizontal: 60,
    alignItems: 'center',
  },
  contentOtpInput: {
    height: 200,
    paddingTop: 60,
    width: 320,
  },
  contentOtpButtons: {
    width: 320,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  titleOtp: {
    fontSize: 20,
    fontWeight: '600',
    color: isDarkMode ? lightTheme.colors.onPrimary : lightTheme.colors.outline,
  },
  subTitleOtp: {
    fontSize: 18,
    textAlign: 'center',
    fontWeight: '400',
    color: isDarkMode ? lightTheme.colors.onPrimary : lightTheme.colors.outline,
  },
  errorOtp: {
    marginTop: 8,
    color: isDarkMode
      ? lightTheme.colors.errorContainer
      : lightTheme.colors.error,
  },
  counterOtp: {
    color: isDarkMode ? lightTheme.colors.onPrimary : lightTheme.colors.outline,
  },
});
