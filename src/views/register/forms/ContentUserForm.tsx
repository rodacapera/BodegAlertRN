import {View, Text} from 'react-native';
import React, {useRef, useState} from 'react';
import InputForm from '@src/views/login/components/InputForm';
import {Button, TextInput} from 'react-native-paper';
import {LoginFormAction} from '@src/types/loginTypes';
import {buttonActionInitialState} from '@src/globals/constants/login';
import {t} from 'i18next';
import {registerStyles} from '../styles/registerStyles';
import {lightTheme} from '@src/hooks/lightMode';
import CustomIcon from '@src/components/customIcon/CustomIcon';
import {isDarkMode} from '@src/globals/styles/screenMode';
import {darkTheme} from '@src/hooks/darkMode';
import {ShopProps, StackNavigation} from '@src/types/globalTypes';
import {useNavigation} from '@react-navigation/native';

const ContentUserForm = ({shop}: {shop: ShopProps}) => {
  const phoneRef = useRef<any>();
  const {navigate} = useNavigation<StackNavigation>();
  const [currentButtonAction, setCurrentButtonAction] =
    useState<LoginFormAction>(buttonActionInitialState);
  return (
    <View>
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
      <View style={[registerStyles.footer]}>
        <Text style={registerStyles.footerText}>
          {t('address')} {shop?.address}
        </Text>
        <Text style={registerStyles.footerText}>
          {t('city')} {shop?.city}
        </Text>
        <Text style={registerStyles.footerText}>
          {t('state')} {shop?.state}
        </Text>
        <Text style={registerStyles.footerText}>
          {t('aliasName')} {shop?.alias}
        </Text>
      </View>
      <View>
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
    </View>
  );
};

export default ContentUserForm;
