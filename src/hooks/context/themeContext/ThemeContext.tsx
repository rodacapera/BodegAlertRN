import AsyncStorage from '@react-native-async-storage/async-storage';
import {customDarkTheme, customLightTheme} from '@src/globals/constants/theme';
import {ThemeContext, ThemeContextMode} from '@src/types/contextTypes';
import {useEffect, useState} from 'react';
import customTheme from '@src/globals/constants/customTheme';

export const ThemeProvider = ({children}: any) => {
  const [currentCustomTheme, setCurrentCustomTheme] =
    useState<ThemeContextMode>();
  const setCurrentTheme = async (myTheme: string) => {
    await AsyncStorage.setItem('@theme', myTheme);
  };
  const {customDefaultTheme} = customTheme();

  const setDarkTheme = () => {
    setCurrentTheme('dark');
    setCurrentCustomTheme(customDarkTheme);
  };

  const setLightTheme = () => {
    setCurrentTheme('light');
    setCurrentCustomTheme(customLightTheme);
  };

  const getCurrentTheme = async () => {
    const myCurrentTheme = await AsyncStorage.getItem('@theme');
    if (myCurrentTheme) {
      myCurrentTheme === 'dark' ? setDarkTheme() : setLightTheme();
    } else {
      setCurrentCustomTheme(customDefaultTheme);
    }
  };

  useEffect(() => {
    getCurrentTheme();
  }, []);

  return (
    currentCustomTheme && (
      <ThemeContext.Provider
        value={{customTheme: currentCustomTheme, setDarkTheme, setLightTheme}}>
        {children}
      </ThemeContext.Provider>
    )
  );
};
