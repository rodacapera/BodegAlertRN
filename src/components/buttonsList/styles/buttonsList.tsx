import {actualTheme} from '@src/types/contextTypes';
import {StyleSheet} from 'react-native';
const {colors} = actualTheme();

export const buttonsListStyles = StyleSheet.create({
  title: {marginVertical: 20, fontWeight: 'bold', color: colors.onSurface}
});
