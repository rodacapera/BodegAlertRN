import React, {useContext, useEffect, useState} from 'react';
import {PaperProvider} from 'react-native-paper';
import NavigationProvider from './src/hooks/navigator/NavigationProvider';
import '@src/hooks/i18n';
import {DarkTheme, NavigationContainer} from '@react-navigation/native';
import {LateralDrawer} from '@src/hooks/navigator/LateralDrawer';
import {ThemeProvider} from '@src/hooks/context/themeContext/ThemeContext';
import {customDefaultTheme} from '@src/globals/constants/theme';

function App(): JSX.Element {
  return (
    <AppState>
      <PaperProvider theme={customDefaultTheme}>
        <LateralDrawer />
      </PaperProvider>
    </AppState>
  );
}

const AppState = ({children}: any) => {
  return <ThemeProvider>{children}</ThemeProvider>;
};
export default App;
