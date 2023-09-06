import {useNavigation} from '@react-navigation/native';
import {
  alert_push,
  emergency,
  location,
  notification
} from '@src/assets/images';
import {handleFinishOnboarding} from '@src/hooks/onboarding/onboardingHook';
import {actualTheme} from '@src/types/contextTypes';
import {MyOnboardingProps, StackNavigation} from '@src/types/globalTypes';
import {splashStyles} from '@src/views/splash/styles/splashStyles';
import React, {Fragment} from 'react';
import {useTranslation} from 'react-i18next';
import {Image} from 'react-native';
import Onboarding from 'react-native-onboarding-swiper';
import CustomDialogAlert from '../customDialogAlert/CustomDialogAlert';

const MyOnboarding = ({route, navigation}: MyOnboardingProps) => {
  const [visible, setVisible] = React.useState(false);
  const {t} = useTranslation();
  const {colors, theme} = actualTheme();
  const {navigate} = useNavigation<StackNavigation>();

  return (
    <Fragment>
      <CustomDialogAlert
        visible={visible}
        setVisible={setVisible}
        title={t('geolocationAlert.errorLocationPermissionsAlert')}
        description={t(
          'geolocationAlert.descriptionErrorLocationPermissionsAlert'
        )}
      />
      <Onboarding
        nextLabel={t('onboarding.next')}
        skipLabel={t('onboarding.skip')}
        bottomBarColor="transparent"
        onSkip={() => handleFinishOnboarding(setVisible, navigate)}
        onDone={() => handleFinishOnboarding(setVisible, navigate)}
        pages={[
          {
            backgroundColor: colors.background,
            image: <Image source={emergency} style={splashStyles.logo} />,
            title: t('onboarding.titleOne'),
            subtitle: t('onboarding.descriptionOne')
          },
          {
            backgroundColor: colors.background,
            image: <Image source={alert_push} style={splashStyles.logo} />,
            title: t('onboarding.titleTwo'),
            subtitle: t('onboarding.descriptionTwo')
          },
          {
            backgroundColor: colors.background,
            image: <Image source={notification} style={splashStyles.logo} />,
            title: t('onboarding.titleThree'),
            subtitle: t('onboarding.descriptionThree')
          },
          {
            backgroundColor: colors.background,
            image: <Image source={location} style={splashStyles.logo} />,
            title: t('onboarding.titleFour'),
            subtitle: t('onboarding.descriptionFour')
          }
        ]}
      />
    </Fragment>
  );
};

export default MyOnboarding;
