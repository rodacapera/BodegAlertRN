import {StyleSheet} from 'react-native';

export const customLoadingOverlayStyles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(255,255,255, 0.60)',
    flex: 1,
    width: '100%',
    alignItems: 'center',
    zIndex: 999999
  },
  loader: {
    flex: 1,
    justifyContent: 'center'
  }
});
