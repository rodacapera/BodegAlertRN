import customTheme from '@src/globals/constants/customTheme';
import {ThemeProvider} from '@src/hooks/context/themeContext/ThemeContext';
import '@src/hooks/i18n';
import {LateralDrawer} from '@src/hooks/navigator/LateralDrawer';
import {Platform} from 'react-native';
import {enableLatestRenderer} from 'react-native-maps';
import {PaperProvider} from 'react-native-paper';

function App(): JSX.Element {
  const {customDefaultTheme} = customTheme();
  if (Platform.OS === 'android') enableLatestRenderer();

  return (
    <ThemeProvider>
      <PaperProvider theme={customDefaultTheme}>
        <LateralDrawer />
      </PaperProvider>
    </ThemeProvider>
  );
}
export default App;
