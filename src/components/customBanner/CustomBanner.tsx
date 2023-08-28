import {CustomBannerProps} from '@src/types/globalTypes';
import {t} from 'i18next';
import {Banner} from 'react-native-paper';

const CustomBanner = ({actions, visible, text, icon}: CustomBannerProps) => {
  return (
    <Banner visible={visible} actions={actions} icon={icon}>
      {text}
    </Banner>
  );
};

export default CustomBanner;
