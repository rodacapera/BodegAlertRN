import {RouteProp, useNavigation} from '@react-navigation/native';
import CustomIcon from '@src/components/customIcon/CustomIcon';
import {buttonActionInitialState} from '@src/globals/constants/login';
import {lightTheme} from '@src/hooks/lightMode';
import {RootStackParamList, StackNavigation} from '@src/types/globalTypes';
import {LoginFormAction} from '@src/types/loginTypes';
import InputForm from '@src/views/login/components/InputForm';
import React, {useRef, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {ScrollView, Text, View} from 'react-native';
import {Button, TextInput} from 'react-native-paper';
import {registerStyles} from '../styles/registerStyles';
import {isDarkMode} from '@src/globals/styles/screenMode';
import {darkTheme} from '@src/hooks/darkMode';

const UserForm = ({
  route,
}: {
  route: RouteProp<RootStackParamList, 'Register'>;
}) => {
  const {t} = useTranslation();
  const {shop} = route.params;
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
    </ScrollView>
  );
};

export default UserForm;
