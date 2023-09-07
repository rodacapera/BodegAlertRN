import {customDefaultTheme} from '@src/globals/constants/theme';
import {ThemeProvider} from '@src/hooks/context/themeContext/ThemeContext';
import '@src/hooks/i18n';
import {LateralDrawer} from '@src/hooks/navigator/LateralDrawer';
import {PaperProvider} from 'react-native-paper';
import {enableLatestRenderer} from 'react-native-maps';
import {Platform} from 'react-native';

function App(): JSX.Element {
  if (Platform.OS === 'android') {
    const res = enableLatestRenderer();
    console.log('res', res);
  }
  return (
    <ThemeProvider>
      <PaperProvider theme={customDefaultTheme}>
        <LateralDrawer />
      </PaperProvider>
    </ThemeProvider>
  );
}
export default App;
