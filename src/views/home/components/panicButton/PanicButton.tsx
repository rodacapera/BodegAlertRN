import {useNavigation} from '@react-navigation/native';
import CustomDialogAlert from '@src/components/customDialogAlert/CustomDialogAlert';
import CustomFab from '@src/components/customFab/CustomFab';
import CustomLoadingOverlay from '@src/components/customLoadingOverlay/CustomLoadingOverlay';
import {panicNotification} from '@src/hooks/panicActions/panicActions';
import {Configuration} from '@src/types/configuration';
import {actualTheme} from '@src/types/contextTypes';
import {StackNavigation} from '@src/types/globalTypes';
import {User} from '@src/types/userTypes';
import {t} from 'i18next';
import {Fragment, useState} from 'react';
import {useWindowDimensions} from 'react-native';

const PanicButton = ({
  user,
  configuration
}: {
  user: User;
  configuration: Configuration;
}) => {
  const {width} = useWindowDimensions();
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
            configuration,
            user as User,
            colors,
            width
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
