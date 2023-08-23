import AsyncStorage from '@react-native-async-storage/async-storage';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {alert_push, emergency, notification} from '@src/assets';
import {RootStackParamList} from '@src/types/globalTypes';
import {splashStyles} from '@src/views/splash/styles/splashStyles';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {Image} from 'react-native';
import Onboarding from 'react-native-onboarding-swiper';

export type MyOnboardingProps = NativeStackScreenProps<
  RootStackParamList,
  'MyOnboarding'
>;

const MyOnboarding = ({route, navigation}: MyOnboardingProps) => {
  const {t} = useTranslation();
  const handleFinishOnboarding = async () => {
    await AsyncStorage.setItem('@appInit', 'true');
    navigation.navigate('LoginSplash');
  };
  return (
    <Onboarding
      nextLabel={t('next')}
      skipLabel={t('skip')}
      bottomBarColor="transparent"
      onSkip={handleFinishOnboarding}
      onDone={handleFinishOnboarding}
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
      ]}
    />
  );
};

export default MyOnboarding;
