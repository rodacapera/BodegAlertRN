import React from 'react';
import {PaperProvider} from 'react-native-paper';
import NavigationProvider from './src/hooks/NavigationProvider';
import '@src/hooks/i18n';
import {paperTheme} from '@src/types/globalTypes';

function App(): JSX.Element {
  return (
    <PaperProvider theme={paperTheme}>
      <NavigationProvider />
    </PaperProvider>
  );
}

export default App;
