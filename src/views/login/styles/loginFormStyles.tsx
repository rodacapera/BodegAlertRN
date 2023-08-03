import {isDarkMode} from '@src/globals/styles/screenMode';
import {lightTheme} from '@src/hooks/lightMode';
import {StyleSheet} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';

export const loginFormStyles = StyleSheet.create({
  logo: {
    backgroundColor: 'transparent',
  },
  loginHeader: {
    height: 250,
  },
  loginContent: {
    flex: 1,
    backgroundColor: isDarkMode ? Colors.black : Colors.white,
  },
  email: {
    width: 200,
    backgroundColor: 'transparent',
  },
  loginBody: {
    height: 390,
    paddingTop: '10%',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: isDarkMode ? Colors.black : Colors.white,
    marginTop: -19,
  },
  phoneFlagContent: {
    width: 90,
    paddingTop: 18,
    paddingLeft: 15,
  },
  phoneInputContainer: {
    height: 50,
    flexDirection: 'row',
    borderBottomColor: lightTheme.colors.error,
    borderBottomWidth: 1,
  },
  loginButtonsContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonLogin: {
    width: 250,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.39,
    shadowRadius: 8.3,
    elevation: 13,
  },
  button: {
    marginBottom: 20,
  },
  buttonQr: {
    width: 150,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.39,
    shadowRadius: 8.3,
    elevation: 13,
  },
  appName: {
    color: Colors.white,
    fontSize: 30,
    fontWeight: 'bold',
  },
  image: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    marginTop: -29,
    width: 278,
  },
  error: {fontSize: 12, color: 'red'},
  flagText: {
    color: isDarkMode ? Colors.white : Colors.black,
  },
});
