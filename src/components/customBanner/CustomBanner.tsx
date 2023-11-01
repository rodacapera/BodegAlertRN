import {actualTheme} from '@src/types/contextTypes';
import {CustomBannerProps} from '@src/types/globalTypes';
import {Banner} from 'react-native-paper';

const CustomBanner = ({actions, visible, text, icon}: CustomBannerProps) => {
  const {colors, theme} = actualTheme();
  return (
    <Banner
      style={{backgroundColor: colors.errorContainer}}
      visible={visible}
      actions={actions}
      icon={icon}>
      {text}
    </Banner>
  );
};

export default CustomBanner;
