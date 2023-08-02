import {isDarkMode} from '@src/globals/styles/screenMode';
import {darkTheme} from '@src/hooks/darkMode';
import {lightTheme} from '@src/hooks/lightMode';
import React from 'react';
import IconA from 'react-native-vector-icons/FontAwesome';
import IconM from 'react-native-vector-icons/MaterialIcons';

const CustomIcon = ({
  font,
  name,
  size = 22,
  color = isDarkMode
    ? darkTheme.colors.onPrimary
    : lightTheme.colors.onPrimaryContainer,
}: {
  font: string;
  name: string;
  size?: number;
  color?: string;
}) => {
  return font === 'material' ? (
    <IconM name={name} size={size} color={color} />
  ) : (
    <IconA name={name} size={size} color={color} />
  );
};

export default CustomIcon;
