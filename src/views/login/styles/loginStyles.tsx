import {lightTheme} from '@src/hooks/lightMode';
import {StyleSheet} from 'react-native';

export const loginStyles = StyleSheet.create({
  content: {flex: 1, paddingTop: 50, paddingLeft: 30, paddingRight: 30},
  header: {
    flex: 2,
  },
  buttonContainer: {
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
  footer: {
    flex: 1,
    paddingVertical: 70,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    marginBottom: 20,
  },
  title: {
    color: lightTheme.colors.onPrimary,
    fontSize: 30,
    fontWeight: 'bold',
  },
  appNameInit: {
    textTransform: 'uppercase',
    fontSize: 25,
    color: lightTheme.colors.inverseOnSurface,
  },
  appNameEnd: {
    fontWeight: 'bold',
    color: lightTheme.colors.primary,
  },
  image: {
    flex: 1,
    justifyContent: 'center',
  },
  descriptionContainer: {
    flex: 2,
    padding: 20,
    backgroundColor: lightTheme.colors.onSurfaceDisabled,
  },
  loginDescription: {
    fontSize: 20,
    textAlign: 'justify',
    color: lightTheme.colors.onPrimary,
  },
});
