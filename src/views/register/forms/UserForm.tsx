import {useNavigation} from '@react-navigation/native';
import CustomIcon from '@src/components/customIcon/CustomIcon';
import CustomInputForm from '@src/components/customInputForm/CustomInputForm';
import {shop} from '@src/globals/constants/fakeData';
import {buttonActionInitialState} from '@src/globals/constants/login';
import {actualTheme} from '@src/types/contextTypes';
import {StackNavigation} from '@src/types/globalTypes';
import {LoginFormAction} from '@src/types/loginTypes';
import {useRef, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {ScrollView, Text, View} from 'react-native';
import {Button, Caption, TextInput} from 'react-native-paper';
import {registerStyles} from '../styles/registerStyles';
import {userFormHook} from './hooks/userFormHook';

const UserForm = () => {
  const {t} = useTranslation();
  const phoneRef = useRef<any>();
  const {colors, theme} = actualTheme();
  const {navigate} = useNavigation<StackNavigation>();
  const {user, isLoadingUserData, currentButtonAction, setCurrentButtonAction} =
    userFormHook();

  // console.log('currentButtonAction', currentButtonAction);

  return (
    <ScrollView
      style={registerStyles.body}
      showsVerticalScrollIndicator={false}>
      <CustomInputForm
        phoneRef={phoneRef}
        setButtonAction={setCurrentButtonAction}
        type="phone"
        value={user.phone.slice(3)}
        code={user.countryCode.toLowerCase()}
      />

      <TextInput
        label={t('adminFormView.names')}
        style={registerStyles.input}
        theme={theme}
        left={
          <TextInput.Icon
            icon={() => (
              <CustomIcon
                name={'pencil'}
                font={'awesome'}
                color={colors.onSurface}
              />
            )}
          />
        }
        value={user.name ?? ''}
      />
      <TextInput
        label={t('adminFormView.lastNames')}
        style={registerStyles.input}
        theme={theme}
        left={
          <TextInput.Icon
            icon={() => (
              <CustomIcon
                name={'pencil'}
                font={'awesome'}
                color={colors.onSurface}
              />
            )}
          />
        }
        value={user.lastname ?? ''}
      />
      <TextInput
        label={t('adminFormView.email')}
        style={registerStyles.input}
        theme={theme}
        left={
          <TextInput.Icon
            icon={() => (
              <CustomIcon
                name={'envelope'}
                font={'awesome'}
                color={colors.onSurface}
              />
            )}
          />
        }
        value={user.email ?? ''}
      />
      <View style={[registerStyles.footer]}>
        <View style={registerStyles.contentFooterText}>
          <Text style={[registerStyles.footerText, {color: colors.onSurface}]}>
            {t('adminFormView.address')}
          </Text>
          <Caption style={{color: colors.onSurfaceDisabled, fontSize: 16}}>
            {user.address}
          </Caption>
        </View>
        <View style={registerStyles.contentFooterText}>
          <Text style={[registerStyles.footerText, {color: colors.onSurface}]}>
            {t('adminFormView.city')}
          </Text>
          <Caption
            style={{
              color: colors.onSurfaceDisabled,
              fontSize: 16,
              textTransform: 'capitalize'
            }}>
            {user.city}
          </Caption>
        </View>
        <View style={registerStyles.contentFooterText}>
          <Text style={[registerStyles.footerText, {color: colors.onSurface}]}>
            {t('adminFormView.state')}
          </Text>
          <Caption
            style={{
              color: colors.onSurfaceDisabled,
              fontSize: 16,
              textTransform: 'capitalize'
            }}>
            {user.departament}
          </Caption>
        </View>
        <View style={registerStyles.contentFooterText}>
          <Text style={[registerStyles.footerText, {color: colors.onSurface}]}>
            {t('adminFormView.aliasName')}
          </Text>
          <Caption
            style={{
              color: colors.onSurfaceDisabled,
              fontSize: 16,
              textTransform: 'capitalize'
            }}>
            {user.alias}
          </Caption>
        </View>
      </View>
      <View>
        <Button
          textColor="white"
          mode="contained"
          icon="check"
          buttonColor={
            theme.dark ? colors.primaryContainer : colors.onPrimaryContainer
          }
          onPress={() => navigate('Register', {administrator: false})}>
          {t('general.continue')}
        </Button>
      </View>
    </ScrollView>
  );
};

export default UserForm;
