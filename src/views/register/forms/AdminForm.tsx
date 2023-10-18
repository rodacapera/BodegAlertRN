import CustomBanner from '@src/components/customBanner/CustomBanner';
import CustomDialogAlert from '@src/components/customDialogAlert/CustomDialogAlert';
import CustomIcon from '@src/components/customIcon/CustomIcon';
import CustomInputForm from '@src/components/customInputForm/CustomInputForm';
import {lightTheme} from '@src/hooks/lightMode';
import {actualTheme} from '@src/types/contextTypes';
import {RegisterType} from '@src/types/globalTypes';
import {DataKey} from '@src/types/userTypes';
import {Fragment, useRef} from 'react';
import {useTranslation} from 'react-i18next';
import {KeyboardAvoidingView, Platform, ScrollView, View} from 'react-native';
import {Button, TextInput} from 'react-native-paper';
import {registerStyles} from '../styles/registerStyles';
import {adminFormHook} from './hooks/adminFormHook';

const AdminForm = ({type}: {type: RegisterType}) => {
  const phoneRef = useRef<any>();
  const {colors, theme} = actualTheme();
  const {t} = useTranslation();
  const {
    myCurrentLocation,
    setCurrentButtonAction,
    generateGroupCode,
    searchGroup,
    alertGroupFound,
    setAlertGroupFound,
    onChangeInput,
    groupFound,
    submitForm,
    user
  } = adminFormHook(type);

  return (
    <View>
      <CustomBanner
        visible={true}
        text={t('registerView.banner')}
        icon="sitemap"
      />
      <CustomDialogAlert
        visible={alertGroupFound}
        setVisible={setAlertGroupFound}
        title={t('adminFormView.alertGroupFoundTitle')}
        description={t('adminFormView.alertGroupFoundDescription')}
      />
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
          />
          {type === 'residence' && (
            <Fragment>
              <TextInput
                label={t('adminFormView.group')}
                style={registerStyles.input}
                theme={theme}
                keyboardType="numeric"
                placeholderTextColor={lightTheme.colors.outlineVariant}
                placeholder="XXXXXX89"
                value={user?.group_number ?? ''}
                onChangeText={text =>
                  onChangeInput(text as never, 'group_number' as DataKey)
                }
                onBlur={searchGroup}
                left={
                  <TextInput.Icon
                    icon={() => (
                      <CustomIcon
                        name={'sitemap'}
                        color={colors.onSurface}
                        font={'awesome'}
                        size={28}
                      />
                    )}
                  />
                }
                right={
                  <TextInput.Icon
                    icon={() => (
                      <CustomIcon
                        name={'refresh'}
                        color={colors.secondary}
                        font={'awesome'}
                      />
                    )}
                    onPress={generateGroupCode}
                  />
                }
              />
              <TextInput
                label={t('adminFormView.groupAlias')}
                style={registerStyles.input}
                theme={theme}
                placeholderTextColor={lightTheme.colors.outlineVariant}
                placeholder={t('adminFormView.placeHolderAliasGroup')}
                value={user?.group_name ?? ''}
                editable={groupFound ? false : true}
                onChangeText={text =>
                  onChangeInput(text as never, 'group_name' as DataKey)
                }
                left={
                  <TextInput.Icon
                    icon={() => (
                      <CustomIcon
                        name={'building-o'}
                        color={colors.onSurface}
                        font={'awesome'}
                        size={28}
                      />
                    )}
                  />
                }
              />
            </Fragment>
          )}

          <TextInput
            label={t('adminFormView.names')}
            style={registerStyles.input}
            theme={theme}
            onChangeText={text =>
              onChangeInput(text as never, 'name' as DataKey)
            }
            left={
              <TextInput.Icon
                icon={() => (
                  <CustomIcon
                    name={'pencil'}
                    color={colors.onSurface}
                    font={'awesome'}
                  />
                )}
              />
            }
          />
          <TextInput
            label={t('adminFormView.lastNames')}
            style={registerStyles.input}
            theme={theme}
            onChangeText={text =>
              onChangeInput(text as never, 'lastname' as DataKey)
            }
            left={
              <TextInput.Icon
                icon={() => (
                  <CustomIcon
                    name={'pencil'}
                    color={colors.onSurface}
                    font={'awesome'}
                  />
                )}
              />
            }
          />
          <TextInput
            label={t('adminFormView.email')}
            style={registerStyles.input}
            theme={theme}
            onChangeText={text =>
              onChangeInput(text as never, 'email' as DataKey)
            }
            left={
              <TextInput.Icon
                icon={() => (
                  <CustomIcon
                    name={'envelope'}
                    color={colors.onSurface}
                    font={'awesome'}
                  />
                )}
              />
            }
          />
          <TextInput
            label={t('adminFormView.aliasName')}
            style={registerStyles.input}
            theme={theme}
            onChangeText={text =>
              onChangeInput(text as never, 'alias' as DataKey)
            }
            left={
              <TextInput.Icon
                icon={() => (
                  <CustomIcon
                    name={'home'}
                    color={colors.onSurface}
                    font={'awesome'}
                    size={28}
                  />
                )}
              />
            }
          />
          <TextInput
            label={t('adminFormView.country')}
            style={registerStyles.input}
            theme={theme}
            editable={false}
            value={myCurrentLocation?.country.long_name}
            left={
              <TextInput.Icon
                icon={() => (
                  <CustomIcon
                    name={'map'}
                    color={colors.onSurface}
                    font={'awesome'}
                  />
                )}
              />
            }
          />
          <TextInput
            label={t('adminFormView.address')}
            style={registerStyles.input}
            theme={theme}
            editable={false}
            value={myCurrentLocation?.address}
            left={
              <TextInput.Icon
                icon={() => (
                  <CustomIcon
                    name={'map-marker'}
                    color={colors.onSurface}
                    font={'awesome'}
                    size={29}
                  />
                )}
              />
            }
          />
          <TextInput
            label={t('adminFormView.city')}
            style={registerStyles.input}
            theme={theme}
            editable={false}
            value={myCurrentLocation?.city.long_name}
            left={
              <TextInput.Icon
                icon={() => (
                  <CustomIcon
                    name={'city'}
                    color={colors.onSurface}
                    font={'materialMc'}
                    size={29}
                  />
                )}
              />
            }
          />
          <TextInput
            label={t('adminFormView.state')}
            style={registerStyles.input}
            theme={theme}
            editable={false}
            value={myCurrentLocation?.state.long_name}
            left={
              <TextInput.Icon
                icon={() => (
                  <CustomIcon
                    name={'flag'}
                    color={colors.onSurface}
                    font={'awesome'}
                  />
                )}
              />
            }
          />
          <View style={{marginTop: 30, marginBottom: 70}}>
            <Button
              textColor="white"
              mode="contained"
              icon="check"
              buttonColor={
                theme.dark ? colors.primaryContainer : colors.onPrimaryContainer
              }
              onPress={submitForm}>
              {t('general.continue')}
            </Button>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

export default AdminForm;
