import CustomTheme from '@src/globals/constants/CustomTheme';
import {ThemeProvider} from '@src/hooks/context/themeContext/ThemeContext';
import '@src/hooks/i18n';
import {LateralDrawer} from '@src/hooks/navigator/LateralDrawer';
import {QueryClientProvider, QueryClient} from '@tanstack/react-query';
import {Platform} from 'react-native';
import {enableLatestRenderer} from 'react-native-maps';
import {PaperProvider} from 'react-native-paper';

// Create a client
const queryClient = new QueryClient();

function App(): JSX.Element {
  const {customDefaultTheme} = CustomTheme();
  if (Platform.OS === 'android') enableLatestRenderer();

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <PaperProvider theme={customDefaultTheme}>
          <LateralDrawer />
        </PaperProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
export default App;
