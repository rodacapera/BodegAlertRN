import {useNavigation} from '@react-navigation/native';
import CustomIcon from '@src/components/customIcon/CustomIcon';
import {buttonActionInitialState} from '@src/globals/constants/login';
import {getLocation} from '@src/hooks/locations/geocoderHook';
import {ThemeContext} from '@src/types/contextTypes';
import {StackNavigation} from '@src/types/globalTypes';
import {GeocoderResponse, ResultLocations} from '@src/types/locationTypes';
import {LoginFormAction} from '@src/types/loginTypes';
import CustomInputForm from '@src/components/customInputForm/CustomInputForm';
import {useContext, useEffect, useRef, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {ScrollView, View} from 'react-native';
import {Button, TextInput} from 'react-native-paper';
import {registerStyles} from '../styles/registerStyles';

const AdminForm = () => {
  const {t} = useTranslation();
  const phoneRef = useRef<any>();
  const {navigate} = useNavigation<StackNavigation>();
  const [currentButtonAction, setCurrentButtonAction] =
    useState<LoginFormAction>(buttonActionInitialState);
  const [myCurrentLocation, setMyCurrentLocation] = useState<ResultLocations>();
  const {
    theme: {colors},
    theme,
  } = useContext(ThemeContext);

  useEffect(() => {
    getLocation(setMyCurrentLocation);
  }, []);

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
        label={t('adminFormView.name')}
        style={registerStyles.input}
        secureTextEntry
        theme={theme}
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
        label={t('adminFormView.lastName')}
        style={registerStyles.input}
        secureTextEntry
        theme={theme}
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
        secureTextEntry
        theme={theme}
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
        disabled
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
        disabled
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
        disabled
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
        disabled
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
      <View style={{marginVertical: 30}}>
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

export default AdminForm;
function findDataLocation(myCurrentLocation: GeocoderResponse) {
  throw new Error('Function not implemented.');
}
