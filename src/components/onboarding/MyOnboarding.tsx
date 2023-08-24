import {useNavigation} from '@react-navigation/native';
import {
  alert_push,
  emergency,
  location,
  notification,
} from '@src/assets/images';
import {handleFinishOnboarding} from '@src/hooks/onboarding/onboardingHook';
import {MyOnboardingProps, StackNavigation} from '@src/types/globalTypes';
import {splashStyles} from '@src/views/splash/styles/splashStyles';
import React, {Fragment} from 'react';
import {useTranslation} from 'react-i18next';
import {Image} from 'react-native';
import Onboarding from 'react-native-onboarding-swiper';
import CustomDialogAlert from '../dialogAlert/CustomDialogAlert';

const MyOnboarding = ({route, navigation}: MyOnboardingProps) => {
  const [visible, setVisible] = React.useState(false);
  const {t} = useTranslation();
  const {navigate} = useNavigation<StackNavigation>();

  return (
    <Fragment>
      <CustomDialogAlert visible={visible} setVisible={setVisible} />
      <Onboarding
        nextLabel={t('next')}
        skipLabel={t('skip')}
        bottomBarColor="transparent"
        onSkip={() => handleFinishOnboarding(setVisible, navigate)}
        onDone={() => handleFinishOnboarding(setVisible, navigate)}
        pages={[
          {
            backgroundColor: '#fff',
            image: <Image source={emergency} style={splashStyles.logo} />,
            title: t('onboardingTitleOne'),
            subtitle: t('onboardingDescriptionOne'),
          },
          {
            backgroundColor: '#fff',
            image: <Image source={alert_push} style={splashStyles.logo} />,
            title: t('onboardingTitleTwo'),
            subtitle: t('onboardingDescriptionTwo'),
          },
          {
            backgroundColor: '#fff',
            image: <Image source={notification} style={splashStyles.logo} />,
            title: t('onboardingTitleThree'),
            subtitle: t('onboardingDescriptionThree'),
          },
          {
            backgroundColor: '#fff',
            image: <Image source={location} style={splashStyles.logo} />,
            title: t('onboardingTitleFour'),
            subtitle: t('onboardingDescriptionFour'),
          },
        ]}
      />
    </Fragment>
  );
};

export default MyOnboarding;
