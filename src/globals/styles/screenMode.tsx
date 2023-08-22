import {useColorScheme} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';

const colorScheme = useColorScheme();

const isDarkMode = colorScheme === 'dark';
const backgroundStyle = {
  flex: 1,
  // backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
};

export {backgroundStyle, isDarkMode};
