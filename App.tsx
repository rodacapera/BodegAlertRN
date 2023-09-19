import customTheme from '@src/globals/constants/customTheme';
import {ThemeProvider} from '@src/hooks/context/themeContext/ThemeContext';
import '@src/hooks/i18n';
import {LateralDrawer} from '@src/hooks/navigator/LateralDrawer';
import {pushConfigure} from '@src/hooks/notifications/notificationsHook';
import {useEffect} from 'react';
import {Platform} from 'react-native';
import {enableLatestRenderer} from 'react-native-maps';
import {PaperProvider} from 'react-native-paper';

function App(): JSX.Element {
  const {customDefaultTheme} = customTheme();

  useEffect(() => {
    if (Platform.OS === 'android') enableLatestRenderer();
    pushConfigure();
  }, []);

  return (
    <ThemeProvider>
      <PaperProvider theme={customDefaultTheme}>
        <LateralDrawer />
      </PaperProvider>
    </ThemeProvider>
  );
}
export default App;
