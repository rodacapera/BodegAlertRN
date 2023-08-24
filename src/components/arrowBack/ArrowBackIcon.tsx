import {ThemeContext} from '@src/types/contextTypes';
import {useContext} from 'react';
import CustomIcon from '../customIcon/CustomIcon';

const ArrowBackIcon = () => {
  const {
    theme: {colors},
  } = useContext(ThemeContext);
  return (
    <CustomIcon font="material" name="arrow-back" color={colors.onPrimary} />
  );
};

export default ArrowBackIcon;
