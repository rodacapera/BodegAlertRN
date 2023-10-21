import {useNavigation} from '@react-navigation/native';
import CustomDialogAlert from '@src/components/customDialogAlert/CustomDialogAlert';
import CustomFab from '@src/components/customFab/CustomFab';
import CustomLoadingOverlay from '@src/components/customLoadingOverlay/CustomLoadingOverlay';
import {panicNotification} from '@src/hooks/panicActions/panicActions';
import {actualTheme} from '@src/types/contextTypes';
import {StackNavigation} from '@src/types/globalTypes';
import {t} from 'i18next';
import {Fragment, useState} from 'react';
import {panicButtonHook} from '@src/views/home/hooks/panicButtonHook';
import {Configuration} from '@src/types/configuration';
import {User} from '@src/types/userTypes';

const PanicButton = () => {
  const {configuration, user} = panicButtonHook();
  const [loading, setLoading] = useState(false);
  const [errorDistance, setErrorDistance] = useState(false);
  const {colors, dark} = actualTheme();
  const navigation = useNavigation<StackNavigation>();

  return (
    <Fragment>
      <CustomDialogAlert
        visible={errorDistance}
        title={
          user?.pay
            ? t('notifications.errorDistanceTitle')
            : t('notifications.disabledTitle')
        }
        description={
          user?.pay
            ? t('notifications.errorDistanceDescription')
            : t('notifications.disabledDescription')
        }
        setVisible={setErrorDistance}
      />
      <CustomLoadingOverlay visible={loading} />
      <CustomFab
        icon={'bell'}
        label={t('home.panicButton')}
        position={'bottomCenter'}
        onPress={() =>
          panicNotification(
            setLoading,
            setErrorDistance,
            navigation,
            configuration as Configuration,
            user as User,
            colors
          )
        }
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
