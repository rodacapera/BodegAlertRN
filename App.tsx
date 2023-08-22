import React, {useContext, useEffect, useState} from 'react';
import {PaperProvider} from 'react-native-paper';
import NavigationProvider from './src/hooks/navigator/NavigationProvider';
import '@src/hooks/i18n';
import {AppTheme, paperTheme} from '@src/types/globalTypes';
import {DarkTheme, NavigationContainer} from '@react-navigation/native';
import {LateralDrawer} from '@src/hooks/navigator/LateralDrawer';
import {
  ThemeContext,
  ThemeProvider,
} from '@src/hooks/context/themeContext/ThemeContext';

function App(): JSX.Element {
  return (
    <AppState>
      <PaperProvider theme={paperTheme}>
        <LateralDrawer />
      </PaperProvider>
    </AppState>
  );
}

const AppState = ({children}: any) => {
  return <ThemeProvider>{children}</ThemeProvider>;
};
export default App;
