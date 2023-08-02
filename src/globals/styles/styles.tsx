import {StyleSheet} from 'react-native';
import {isDarkMode} from '@src/globals/styles/screenMode';
import {Colors} from 'react-native/Libraries/NewAppScreen';

export const globalStyles = StyleSheet.create({
  contentView: {
    backgroundColor: isDarkMode ? Colors.black : Colors.white,
    padding: 15,
  },
});
