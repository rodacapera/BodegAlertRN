import {darkTheme} from '@src/hooks/darkMode';
import {lightTheme} from '@src/hooks/lightMode';
import {ThemeContextMode} from '@src/types/contextTypes';
import {MD3DarkTheme, MD3LightTheme} from 'react-native-paper';
import {useColorScheme} from 'react-native';

export const colorScheme = useColorScheme();
export const customLightTheme = {
  ...MD3LightTheme,
  colors: lightTheme.colors,
} as ThemeContextMode;

export const customDarkTheme = {
  ...MD3DarkTheme,
  colors: darkTheme.colors,
} as ThemeContextMode;

export const customDefaultTheme = (
  colorScheme === 'dark'
    ? {...MD3DarkTheme, colors: darkTheme.colors}
    : {...MD3LightTheme, colors: lightTheme.colors}
) as ThemeContextMode;
