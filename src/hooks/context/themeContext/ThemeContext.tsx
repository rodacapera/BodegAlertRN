import AsyncStorage from '@react-native-async-storage/async-storage';
import {ThemeContext, ThemeContextMode} from '@src/types/contextTypes';
import {useContext, useEffect, useState} from 'react';
import {
  customDarkTheme,
  customDefaultTheme,
  customLightTheme
} from '@src/globals/constants/theme';

export const ThemeProvider = ({children}: any) => {
  const [customTheme, setCustomTheme] = useState<ThemeContextMode>();
  const setCurrentTheme = async (myTheme: string) => {
    await AsyncStorage.setItem('@theme', myTheme);
  };

  const setDarkTheme = () => {
    setCurrentTheme('dark');
    setCustomTheme(customDarkTheme);
  };

  const setLightTheme = () => {
    setCurrentTheme('light');
    setCustomTheme(customLightTheme);
  };

  const getCurrentTheme = async () => {
    const myCurrentTheme = await AsyncStorage.getItem('@theme');
    if (myCurrentTheme) {
      myCurrentTheme === 'dark' ? setDarkTheme() : setLightTheme();
    } else {
      setCustomTheme(customDefaultTheme);
    }
  };

  useEffect(() => {
    getCurrentTheme();
  }, []);

  return (
    customTheme && (
      <ThemeContext.Provider value={{customTheme, setDarkTheme, setLightTheme}}>
        {children}
      </ThemeContext.Provider>
    )
  );
};
