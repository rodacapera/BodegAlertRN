import React, {useEffect, useState} from 'react';
import {createContext} from 'react';

import {MD3DarkTheme, MD3LightTheme, MD3Theme} from 'react-native-paper';
import {darkTheme} from '@src/hooks/darkMode';
import {lightTheme} from '@src/hooks/lightMode';
import {useColorScheme} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type ThemeContextMode = MD3Theme & {
  dark: boolean;
  colors: {
    primary: string;
    background: string;
    card: string;
    text: string;
    border: string;
    notification: string;
  };
};

interface TeamContextProps {
  theme: ThemeContextMode;
  setDarkTheme: () => void;
  setLightTheme: () => void;
}

export const ThemeContext = createContext({} as TeamContextProps);

const setCurrentTheme = async (theme: string) => {
  await AsyncStorage.setItem('@theme', theme);
};

export const ThemeProvider = ({children}: any) => {
  const colorScheme = useColorScheme();
  const [theme, setTheme] = useState<ThemeContextMode>();

  const setDarkTheme = () => {
    console.log('setDarkTheme');
    setCurrentTheme('dark');
    setTheme({...MD3DarkTheme, colors: darkTheme.colors} as ThemeContextMode);
  };
  const setLightTheme = () => {
    console.log('setLightTheme');
    setCurrentTheme('light');
    setTheme({...MD3LightTheme, colors: lightTheme.colors} as ThemeContextMode);
  };

  const getCurrentTheme = async () => {
    const myCurrentTheme = await AsyncStorage.getItem('@theme');
    if (myCurrentTheme) {
      myCurrentTheme === 'dark' ? setDarkTheme() : setLightTheme();
    } else {
      const currentTheme =
        colorScheme === 'dark'
          ? {...MD3DarkTheme, colors: darkTheme.colors}
          : {...MD3LightTheme, colors: lightTheme.colors};
      setTheme(currentTheme as ThemeContextMode);
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
