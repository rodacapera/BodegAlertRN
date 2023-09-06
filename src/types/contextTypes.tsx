import {createContext, useContext} from 'react';
import {MD3Theme} from 'react-native-paper';

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

export interface TeamContextProps {
  customTheme: ThemeContextMode;
  setDarkTheme: () => void;
  setLightTheme: () => void;
}

export const ThemeContext = createContext({} as TeamContextProps);

export const actualTheme = () => {
  const {
    customTheme: {colors, dark},
    customTheme,
    setDarkTheme,
    setLightTheme
  } = useContext(ThemeContext);
  return {
    theme: customTheme,
    colors: colors,
    dark,
    setDarkTheme,
    setLightTheme
  };
};
