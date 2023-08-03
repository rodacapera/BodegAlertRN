import {isDarkMode} from '@src/globals/styles/screenMode';
import {darkTheme} from '@src/hooks/darkMode';
import {lightTheme} from '@src/hooks/lightMode';
import {CustomIconProps} from '@src/types/customIconTypes';
import React from 'react';
import IconA from 'react-native-vector-icons/FontAwesome';
import IconMc from 'react-native-vector-icons/MaterialCommunityIcons';
import IconM from 'react-native-vector-icons/MaterialIcons';

const CustomIcon = ({
  font,
  name,
  size = 22,
  color = isDarkMode
    ? darkTheme.colors.onPrimary
    : lightTheme.colors.onPrimaryContainer,
}: CustomIconProps) => {
  return font === 'material' ? (
    <IconM name={name} size={size} color={color} />
  ) : font === 'awesome' ? (
    <IconA name={name} size={size} color={color} />
  ) : (
    <IconMc name={name} size={size} color={color} />
  );
};

export default CustomIcon;
