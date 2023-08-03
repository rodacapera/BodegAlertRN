import {isDarkMode} from '@src/globals/styles/screenMode';
import {lightTheme} from '@src/hooks/lightMode';
import React from 'react';
import CustomIcon from '../customIcon/CustomIcon';

const ArrowBackIcon = () => (
  <CustomIcon
    font="material"
    name="arrow-back"
    color={
      isDarkMode
        ? lightTheme.colors.onPrimary
        : lightTheme.colors.onErrorContainer
    }
  />
);

export default ArrowBackIcon;
