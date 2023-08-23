import AsyncStorage from '@react-native-async-storage/async-storage';
import {ThemeContext, ThemeContextMode} from '@src/types/contextTypes';
import {useEffect, useState} from 'react';
import {
  customDarkTheme,
  customDefaultTheme,
  customLightTheme,
} from '@src/globals/constants/theme';

export const ThemeProvider = ({children}: any) => {
  const [theme, setTheme] = useState<ThemeContextMode>();
  const setCurrentTheme = async (theme: string) => {
    await AsyncStorage.setItem('@theme', theme);
  };

  const setDarkTheme = () => {
    setCurrentTheme('dark');
    setTheme(customDarkTheme);
  };

  const setLightTheme = () => {
    setCurrentTheme('light');
    setTheme(customLightTheme);
  };

  const getCurrentTheme = async () => {
    const myCurrentTheme = await AsyncStorage.getItem('@theme');
    if (myCurrentTheme) {
      myCurrentTheme === 'dark' ? setDarkTheme() : setLightTheme();
    } else {
      setTheme(customDefaultTheme);
    }
  };

  useEffect(() => {
    getCurrentTheme();
  }, []);

  return (
    theme && (
      <ThemeContext.Provider value={{theme, setDarkTheme, setLightTheme}}>
        {children}
      </ThemeContext.Provider>
    )
  );
};
