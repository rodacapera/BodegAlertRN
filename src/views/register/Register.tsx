import CustomIcon from '@src/components/customIcon/CustomIcon';
import {buttonActionInitialState} from '@src/globals/constants/login';
import {backgroundStyle} from '@src/globals/styles/screenMode';
import {lightTheme} from '@src/hooks/lightMode';
import {RegisterProps} from '@src/types/globalTypes';
import {LoginFormAction} from '@src/types/loginTypes';
import React, {useRef, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {View} from 'react-native';
import {Text, TextInput} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';
import InputForm from '../login/components/InputForm';
import {registerStyles} from './styles/registerStyles';

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
        <View style={registerStyles.body}>
          <InputForm
            phoneRef={phoneRef}
            setButtonAction={setCurrentButtonAction}
          />

          <TextInput
            label={t('name')}
            style={registerStyles.input}
            secureTextEntry
            theme={{
              colors: {onSurface: lightTheme.colors.error},
            }}
            left={
              <TextInput.Icon
                icon={() => <CustomIcon name={'pencil'} font={'awesome'} />}
              />
            }
          />
          <TextInput
            label={t('lastName')}
            style={registerStyles.input}
            secureTextEntry
            theme={{
              colors: {onSurface: lightTheme.colors.error},
            }}
            left={
              <TextInput.Icon
                icon={() => <CustomIcon name={'pencil'} font={'awesome'} />}
              />
            }
          />
          <TextInput
            label={t('email')}
            style={registerStyles.input}
            secureTextEntry
            theme={{
              colors: {onSurface: lightTheme.colors.error},
            }}
            left={
              <TextInput.Icon
                icon={() => <CustomIcon name={'email'} font={'awesome'} />}
              />
            }
          />
          <TextInput
            label={t('address')}
            style={registerStyles.input}
            secureTextEntry
            theme={{
              colors: {onSurface: lightTheme.colors.error},
            }}
            left={
              <TextInput.Icon
                icon={() => <CustomIcon name={'camera'} font={'awesome'} />}
              />
            }
          />
          <TextInput
            label={t('city')}
            style={registerStyles.input}
            secureTextEntry
            theme={{
              colors: {onSurface: lightTheme.colors.error},
            }}
            left={
              <TextInput.Icon
                icon={() => <CustomIcon name={'camera'} font={'awesome'} />}
              />
            }
          />
          <TextInput
            label={t('state')}
            style={registerStyles.input}
            secureTextEntry
            theme={{
              colors: {onSurface: lightTheme.colors.error},
            }}
            left={
              <TextInput.Icon
                icon={() => <CustomIcon name={'camera'} font={'awesome'} />}
              />
            }
          />
          <TextInput
            label={t('aliasName')}
            style={registerStyles.input}
            secureTextEntry
            theme={{
              colors: {onSurface: lightTheme.colors.error},
            }}
            left={
              <TextInput.Icon
                icon={() => <CustomIcon name={'camera'} font={'awesome'} />}
              />
            }
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Register;
