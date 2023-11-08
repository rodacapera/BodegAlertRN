import AsyncStorage from '@react-native-async-storage/async-storage';
import {customDarkTheme, customLightTheme} from '@src/globals/constants/theme';
import {ThemeContext, ThemeContextMode} from '@src/types/contextTypes';
import {useCallback, useEffect, useState} from 'react';
import CustomTheme from '@src/globals/constants/CustomTheme';

export const ThemeProvider = ({children}: any) => {
  const {customDefaultTheme} = CustomTheme();
  const [currentCustomTheme, setCurrentCustomTheme] =
    useState<ThemeContextMode>();

  const setCurrentTheme = async (myTheme: string) => {
    await AsyncStorage.setItem('@theme', myTheme);
  };

  const setDarkTheme = useCallback(() => {
    setCurrentTheme('dark');
    setCurrentCustomTheme(customDarkTheme);
  }, []);

  const setLightTheme = useCallback(() => {
    setCurrentTheme('light');
    setCurrentCustomTheme(customLightTheme);
  }, []);

  useEffect(() => {
    const getCurrentTheme = async () => {
      const myCurrentTheme = await AsyncStorage.getItem('@theme');
      if (myCurrentTheme) {
        myCurrentTheme === 'dark' ? setDarkTheme() : setLightTheme();
      } else {
        setCurrentCustomTheme(customDefaultTheme);
      }
    };
    getCurrentTheme();
  }, [customDefaultTheme, setDarkTheme, setLightTheme]);

  return (
    currentCustomTheme && (
      <ThemeContext.Provider
        value={{customTheme: currentCustomTheme, setDarkTheme, setLightTheme}}>
        {children}
      </ThemeContext.Provider>
    )
  );
};
