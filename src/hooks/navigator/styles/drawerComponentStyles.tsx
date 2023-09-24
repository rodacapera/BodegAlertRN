import {Platform, StyleSheet} from 'react-native';

export const drawerComponentStyles = StyleSheet.create({
  drawerContent: {
    flex: 1
  },
  userInfoSection: {
    marginTop: Platform.OS === 'android' ? 30 : 0,
    paddingLeft: 20
  },
  title: {
    marginTop: 20,
    fontWeight: 'bold'
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
    textTransform: 'capitalize'
  },
  row: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center'
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15
  },
  paragraph: {
    fontWeight: 'bold',
    marginRight: 3
  },
  drawerSection: {
    marginTop: 15
  },
  preference: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16
  },
  logos: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 20
  },
  imagesLogos: {
    width: 70,
    height: 70,
    borderRadius: 100,
    margin: 10
  },
  titleLogos: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center'
  }
});
