import {View, Text, ScrollView} from 'react-native';
import React, {useRef, useState} from 'react';
import InputForm from '@src/views/login/components/InputForm';
import {registerStyles} from '../styles/registerStyles';
import {useTranslation} from 'react-i18next';
import {buttonActionInitialState} from '@src/globals/constants/login';
import {LoginFormAction} from '@src/types/loginTypes';
import {Button, TextInput} from 'react-native-paper';
import {lightTheme} from '@src/hooks/lightMode';
import CustomIcon from '@src/components/customIcon/CustomIcon';
import {isDarkMode} from '@src/globals/styles/screenMode';
import {darkTheme} from '@src/hooks/darkMode';
import {useNavigation} from '@react-navigation/native';
import {StackNavigation} from '@src/types/globalTypes';

const AdminForm = () => {
  const {t} = useTranslation();
  const phoneRef = useRef<any>();
  const {navigate} = useNavigation<StackNavigation>();
  const [currentButtonAction, setCurrentButtonAction] =
    useState<LoginFormAction>(buttonActionInitialState);

  console.log('currentButtonAction', currentButtonAction);
  return (
    <ScrollView
      style={registerStyles.body}
      showsVerticalScrollIndicator={false}>
      <InputForm
        phoneRef={phoneRef}
        setButtonAction={setCurrentButtonAction}
        type="phone"
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
            icon={() => <CustomIcon name={'envelope'} font={'awesome'} />}
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
            icon={() => <CustomIcon name={'map'} font={'awesome'} />}
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
            icon={() => (
              <CustomIcon name={'city'} font={'materialMc'} size={29} />
            )}
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
            icon={() => <CustomIcon name={'flag'} font={'awesome'} />}
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
            icon={() => <CustomIcon name={'home'} font={'awesome'} />}
          />
        }
      />
      <View style={{marginVertical: 30}}>
        <Button
          textColor="white"
          mode="contained"
          icon="check"
          buttonColor={
            isDarkMode
              ? darkTheme.colors.primaryContainer
              : lightTheme.colors.onPrimaryContainer
          }
          onPress={() => navigate('Register', {administrator: false})}>
          {t('continue')}
        </Button>
      </View>
    </ScrollView>
  );
};

export default AdminForm;
