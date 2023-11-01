import {StyleSheet} from 'react-native';

export const registerStyles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
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
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 50
  },
  activeButton: {
    borderBottomWidth: 1,
    padding: 10,
    marginHorizontal: 2,
    alignItems: 'center',
    borderRadius: 4,
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2 // Android
  },
  inactiveButton: {
    padding: 10,
    marginHorizontal: 2,
    alignItems: 'center',
    backgroundColor: 'rgba(245, 40, 145, 0.05)',
    borderRadius: 4
  }
});
