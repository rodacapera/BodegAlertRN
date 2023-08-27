import {Platform, StyleSheet} from 'react-native';

export const customFabStyles = StyleSheet.create({
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: Platform.OS === 'android' ? 0 : 10,
  },
});
