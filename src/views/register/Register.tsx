import {backgroundStyle} from '@src/globals/styles/screenMode';
import {RegisterProps} from '@src/types/globalTypes';
import React, {useRef, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {View} from 'react-native';
import {Text, TextInput} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';
import {registerStyles} from './styles/registerStyles';
import InputForm from '../login/components/InputForm';
import {LoginFormAction} from '@src/types/loginTypes';
import {buttonActionInitialState} from '@src/globals/constants/login';
import CustomIcon from '@src/components/customIcon/CustomIcon';
import {blue100} from 'react-native-paper/lib/typescript/src/styles/themes/v2/colors';
import {lightTheme} from '@src/hooks/lightMode';

const Register = ({navigation}: RegisterProps) => {
  const {i18n, t} = useTranslation();
  const phoneRef = useRef<any>();
  const [currentButtonAction, setCurrentButtonAction] =
    useState<LoginFormAction>(buttonActionInitialState);

  return (
    <SafeAreaView style={backgroundStyle}>
      <View style={registerStyles.container}>
        <Text style={registerStyles.title} variant="titleLarge">
          {t('titleCreateAccount')}
        </Text>

        <InputForm
          phoneRef={phoneRef}
          setButtonAction={setCurrentButtonAction}
        />

        <TextInput
          label="Password"
          style={registerStyles.input}
          secureTextEntry
          theme={{
            colors: {onSurface: lightTheme.colors.error},
          }}
          right={
            <TextInput.Icon
              icon={() => <CustomIcon name={'camera'} font={'awesome'} />}
            />
          }
        />
      </View>
    </SafeAreaView>
  );
};

export default Register;
