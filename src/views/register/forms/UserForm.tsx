import {useNavigation} from '@react-navigation/native';
import CustomIcon from '@src/components/customIcon/CustomIcon';
import CustomInputForm from '@src/components/customInputForm/CustomInputForm';
import {actualTheme} from '@src/types/contextTypes';
import {StackNavigation} from '@src/types/globalTypes';
import {Fragment, useRef} from 'react';
import {useTranslation} from 'react-i18next';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  View
} from 'react-native';
import {Button, Caption, TextInput} from 'react-native-paper';
import {registerStyles} from '../styles/registerStyles';
import {userFormHook} from './hooks/userFormHook';
import CustomLoadingOverlay from '@src/components/customLoadingOverlay/CustomLoadingOverlay';
import CustomLoader from '@src/components/customLoader/CustomLoader';

const UserForm = () => {
  const {t} = useTranslation();
  const phoneRef = useRef<any>();
  const {colors, theme, dark} = actualTheme();

  const {
    user,
    setCurrentButtonAction,
    handleOnchangeInput,
    handleEditUser,
    isLoading,
    error
  } = userFormHook();

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{flex: 1}}>
      <ScrollView
        style={registerStyles.body}
        showsVerticalScrollIndicator={false}>
        <CustomInputForm
          phoneRef={phoneRef}
          setButtonAction={setCurrentButtonAction}
          type="phone"
          value={user?.phone.slice(3)}
          code={user?.countryCode.toLowerCase()}
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
          value={user?.name ?? ''}
          onChangeText={text => handleOnchangeInput(text as never, 'name')}
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
          value={user?.lastname ?? ''}
          onChangeText={text => handleOnchangeInput(text as never, 'lastname')}
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
          value={user?.email ?? ''}
          onChangeText={text => handleOnchangeInput(text as never, 'email')}
        />
        <TextInput
          label={t('adminFormView.aliasName')}
          style={registerStyles.input}
          theme={theme}
          left={
            <TextInput.Icon
              icon={() => (
                <CustomIcon
                  name={'home'}
                  font={'awesome'}
                  color={colors.onSurface}
                  size={28}
                />
              )}
            />
          }
          value={user?.alias ?? ''}
          onChangeText={text => handleOnchangeInput(text as never, 'alias')}
        />
        <TextInput
          label={t('adminFormView.address')}
          style={registerStyles.input}
          theme={theme}
          left={
            <TextInput.Icon
              icon={() => (
                <CustomIcon
                  name={'map-marker'}
                  font={'awesome'}
                  color={colors.onSurface}
                  size={28}
                />
              )}
            />
          }
          value={user?.address ?? ''}
          onChangeText={text => handleOnchangeInput(text as never, 'address')}
        />
        <View style={[registerStyles.footer]}>
          <View style={registerStyles.contentFooterText}>
            <Text
              style={[registerStyles.footerText, {color: colors.onSurface}]}>
              {t('adminFormView.address')}
            </Text>
            <Caption
              style={{
                color: dark
                  ? colors.onSurfaceVariant
                  : colors.onSurfaceDisabled,
                fontSize: 16
              }}>
              {user?.address}
            </Caption>
          </View>
          <View style={registerStyles.contentFooterText}>
            <Text
              style={[registerStyles.footerText, {color: colors.onSurface}]}>
              {t('adminFormView.city')}
            </Text>
            <Caption
              style={{
                color: dark
                  ? colors.onSurfaceVariant
                  : colors.onSurfaceDisabled,
                fontSize: 16,
                textTransform: 'capitalize'
              }}>
              {user?.city}
            </Caption>
          </View>
          <View style={registerStyles.contentFooterText}>
            <Text
              style={[registerStyles.footerText, {color: colors.onSurface}]}>
              {t('adminFormView.state')}
            </Text>
            <Caption
              style={{
                color: dark
                  ? colors.onSurfaceVariant
                  : colors.onSurfaceDisabled,
                fontSize: 16,
                textTransform: 'capitalize'
              }}>
              {user?.departament}
            </Caption>
          </View>
          <View style={registerStyles.contentFooterText}>
            <Text
              style={[registerStyles.footerText, {color: colors.onSurface}]}>
              {t('adminFormView.aliasName')}
            </Text>
            <Caption
              style={{
                color: dark
                  ? colors.onSurfaceVariant
                  : colors.onSurfaceDisabled,
                fontSize: 16,
                textTransform: 'capitalize'
              }}>
              {user?.alias}
            </Caption>
          </View>
        </View>
        {error ? (
          <View>
            <Text style={{color: colors.onSurface}}>error</Text>
          </View>
        ) : (
          <></>
        )}
        <View style={{paddingBottom: 90}}>
          <Button
            textColor="white"
            mode="contained"
            icon={
              isLoading
                ? () => (
                    <View style={{height: 25}}>
                      <CustomLoader visible label={''} />
                    </View>
                  )
                : 'check'
            }
            buttonColor={
              theme.dark ? colors.primaryContainer : colors.onPrimaryContainer
            }
            disabled={isLoading}
            onPress={handleEditUser}>
            {t('general.continue')}
          </Button>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default UserForm;
