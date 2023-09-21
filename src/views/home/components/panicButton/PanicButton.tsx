import CustomFab from '@src/components/customFab/CustomFab';
import CustomLoadingOverlay from '@src/components/customLoadingOverlay/CustomLoadingOverlay';
import {panicNotification} from '@src/hooks/panicActions/panicActions';
import {actualTheme} from '@src/types/contextTypes';
import {t} from 'i18next';
import {Fragment, useState} from 'react';

const PanicButton = () => {
  const [loading, setLoading] = useState(false);
  const {colors, dark} = actualTheme();

  return (
    <Fragment>
      <CustomLoadingOverlay visible={loading} />
      <CustomFab
        icon={'bell'}
        label={t('home.panicButton')}
        position={'bottomCenter'}
        onPress={() => panicNotification(setLoading)}
        style={{
          backgroundColor: dark ? colors.onPrimary : colors.onErrorContainer,
          borderRadius: 50
        }}
        iconColor="white"
      />
    </Fragment>
  );
};

export default PanicButton;
