import {actualTheme} from '@src/types/contextTypes';
import {StyleSheet} from 'react-native';
const {colors} = actualTheme();

export const buttonsListStyles = StyleSheet.create({
  title: {color: colors.onSurface, fontWeight: 'bold', marginVertical: 20}
});
