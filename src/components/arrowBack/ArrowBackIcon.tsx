import {actualTheme} from '@src/types/contextTypes';
import CustomIcon from '../customIcon/CustomIcon';

const ArrowBackIcon = () => {
  const {colors} = actualTheme();
  return (
    <CustomIcon font="material" name="arrow-back" color={colors.onPrimary} />
  );
};

export default ArrowBackIcon;
