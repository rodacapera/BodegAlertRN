import {useNavigation} from '@react-navigation/native';
import CustomIcon from '@src/components/customIcon/CustomIcon';
import {shop} from '@src/globals/constants/fakeData';
import {buttonActionInitialState} from '@src/globals/constants/login';
import {ThemeContext} from '@src/types/contextTypes';
import {StackNavigation} from '@src/types/globalTypes';
import {LoginFormAction} from '@src/types/loginTypes';
import CustomInputForm from '@src/components/customInputForm/CustomInputForm';
import {useContext, useRef, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {ScrollView, Text, View} from 'react-native';
import {Button, Caption, TextInput} from 'react-native-paper';
import {registerStyles} from '../styles/registerStyles';

const UserForm = () => {
  const {t} = useTranslation();
  const phoneRef = useRef<any>();
  const {
    theme: {colors},
    theme,
  } = useContext(ThemeContext);
  const {navigate} = useNavigation<StackNavigation>();
  const [currentButtonAction, setCurrentButtonAction] =
    useState<LoginFormAction>(buttonActionInitialState);

  return (
    <ScrollView
      style={registerStyles.body}
      showsVerticalScrollIndicator={false}>
      <CustomInputForm
        phoneRef={phoneRef}
        setButtonAction={setCurrentButtonAction}
        type="phone"
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
      />
      <View style={[registerStyles.footer]}>
        <View style={registerStyles.contentFooterText}>
          <Text style={[registerStyles.footerText, {color: colors.onSurface}]}>
            {t('adminFormView.address')}
          </Text>
          <Caption style={{color: colors.onSurfaceDisabled, fontSize: 16}}>
            {shop.address}
          </Caption>
        </View>
        <View style={registerStyles.contentFooterText}>
          <Text style={[registerStyles.footerText, {color: colors.onSurface}]}>
            {t('adminFormView.city')}
          </Text>
          <Caption style={{color: colors.onSurfaceDisabled, fontSize: 16}}>
            {shop.city}
          </Caption>
        </View>
        <View style={registerStyles.contentFooterText}>
          <Text style={[registerStyles.footerText, {color: colors.onSurface}]}>
            {t('adminFormView.state')}
          </Text>
          <Caption style={{color: colors.onSurfaceDisabled, fontSize: 16}}>
            {shop.state}
          </Caption>
        </View>
        <View style={registerStyles.contentFooterText}>
          <Text style={[registerStyles.footerText, {color: colors.onSurface}]}>
            {t('adminFormView.aliasName')}
          </Text>
          <Caption style={{color: colors.onSurfaceDisabled, fontSize: 16}}>
            {shop.alias}
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
