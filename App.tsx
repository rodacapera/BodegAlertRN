import {customDefaultTheme} from '@src/globals/constants/theme';
import {ThemeProvider} from '@src/hooks/context/themeContext/ThemeContext';
import '@src/hooks/i18n';
import {LateralDrawer} from '@src/hooks/navigator/LateralDrawer';
import {PaperProvider} from 'react-native-paper';
import 'react-native-gesture-handler';

function App(): JSX.Element {
  return (
    <ThemeProvider>
      <PaperProvider theme={customDefaultTheme}>
        <LateralDrawer />
      </PaperProvider>
    </ThemeProvider>
  );
}
export default App;
