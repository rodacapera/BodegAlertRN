import {t} from 'i18next';
import * as React from 'react';
import {Button, Image} from 'react-native';
import {Banner} from 'react-native-paper';
import {$RemoveChildren} from 'react-native-paper/lib/typescript/src/types';

type CustomBannerProps = {label: string & $RemoveChildren<typeof Button>}[];
const CustomBanner = ({
  actions,
  visible,
}: {
  actions?: CustomBannerProps;
  visible: boolean;
}) => {
  return (
    <Banner visible={visible} actions={actions} icon={'account-group-outline'}>
      {t('employeesView.banner')}
    </Banner>
  );
};

export default CustomBanner;
