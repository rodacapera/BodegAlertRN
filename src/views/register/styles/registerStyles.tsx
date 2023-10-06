import {StyleSheet} from 'react-native';

export const registerStyles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
    alignItems: 'center'
  },
  input: {
    width: 280,
    backgroundColor: 'transparent',
    marginVertical: 15
  },
  body: {
    marginTop: 10,
    width: '100%',
    paddingHorizontal: 50
  },
  footer: {
    marginVertical: 30
  },
  contentFooterText: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  footerText: {
    alignItems: 'center'
  },
  contentBackButtonRegister: {
    position: 'absolute',
    left: -10,
    top: -30,
    alignItems: 'flex-start',
    zIndex: 99999
  },
  header: {
    width: '100%',
    marginHorizontal: 20,
    position: 'relative'
  }
});
