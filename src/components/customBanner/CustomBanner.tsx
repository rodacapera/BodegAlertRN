import {CustomBannerProps} from '@src/types/globalTypes';
import {t} from 'i18next';
import {Banner} from 'react-native-paper';

const CustomBanner = ({actions, visible}: CustomBannerProps) => {
  return (
    <Banner visible={visible} actions={actions} icon={'account-group-outline'}>
      {t('employeesView.banner')}
    </Banner>
  );
};

export default CustomBanner;
