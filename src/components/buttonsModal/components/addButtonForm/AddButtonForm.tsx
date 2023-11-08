import CustomIcon from '@src/components/customIcon/CustomIcon';
import {actualTheme} from '@src/types/contextTypes';
import {t} from 'i18next';
import {useEffect, useState} from 'react';
import {TouchableOpacity, View} from 'react-native';
import Clipboard from '@react-native-clipboard/clipboard';
import {Button, Caption, TextInput, Title, Text} from 'react-native-paper';
import {buttonsModalStyles} from '../../styles/buttonsModalStyles';
import CustomLoader from '@src/components/customLoader/CustomLoader';

const AddButtonForm = ({
  iss,
  backButton,
  setSendSetButton,
  setNameIsd,
  setPassIsd,
  urlConfigButton,
  saveButton,
  internetError,
  savingData,
  passIsd,
  sendSetButton,
  unConnectedShellyButton,
  buttonNotReady
}: {
  iss: string;
  backButton: (e: string) => void;
  setSendSetButton: (e: boolean) => void;
  setNameIsd: (e: string) => void;
  setPassIsd: (e: string) => void;
  urlConfigButton: string | undefined;
  saveButton: () => void;
  internetError: boolean;
  savingData: boolean;
  passIsd: string | undefined;
  sendSetButton: boolean;
  unConnectedShellyButton: boolean;
  buttonNotReady: boolean;
}) => {
  const [eye, setEye] = useState(false);
  const {colors, theme} = actualTheme();

  // useEffect(() => {
  //   setNameIsd(iss.toString());
  // }, [iss, setNameIsd]);

  const copyToClipboard = () => {
    urlConfigButton && Clipboard.setString(urlConfigButton);
  };

  return (
    <View>
      <Title style={{fontWeight: 'bold', color: colors.onSurface}}>
        {urlConfigButton
          ? t('buttonsModal.formTitleFinish')
          : t('buttonsModal.formTitle')}
      </Title>
      {urlConfigButton ? (
        <View style={{marginTop: 20}}>
          <Text
            style={{
              color: colors.onSurface,
              marginBottom: 10,
              fontWeight: 'bold'
            }}>{`${t('buttonsModal.descriptionLastStep')}`}</Text>
          <TouchableOpacity onPress={copyToClipboard}>
            <Text style={{color: colors.onSurface}}>{urlConfigButton}</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View>
          <TextInput
            label={t('buttonsModal.networkName')}
            style={buttonsModalStyles.input}
            theme={theme}
            value={iss.toString()}
            editable={false}
            left={
              <TextInput.Icon
                icon={() => (
                  <CustomIcon
                    name={'wifi'}
                    font={'awesome'}
                    color={colors.onSurface}
                  />
                )}
              />
            }
          />
          <TextInput
            label={t('buttonsModal.networkPass')}
            style={buttonsModalStyles.input}
            theme={theme}
            keyboardType="visible-password"
            secureTextEntry={eye ? false : true}
            onChangeText={text => setPassIsd(text)}
            value={passIsd}
            left={
              <TextInput.Icon
                icon={() => (
                  <CustomIcon
                    name={'lock'}
                    font={'awesome'}
                    color={colors.onSurface}
                  />
                )}
              />
            }
            right={
              <TextInput.Icon
                icon={() => (
                  <CustomIcon
                    name={eye ? 'eye' : 'eye-slash'}
                    font={'awesome'}
                    color={colors.onSurface}
                  />
                )}
                onPress={() => setEye(!eye)}
              />
            }
          />
          <Caption style={{color: colors.onSurface}}>
            {t('buttonsModal.formCaption')}
          </Caption>
        </View>
      )}
      {internetError && (
        <View style={{marginTop: 20}}>
          <Text style={{fontWeight: 'bold', color: colors.error}}>
            {t('buttonsModal.internetError')}
          </Text>
        </View>
      )}
      {unConnectedShellyButton && (
        <View style={{marginTop: 20}}>
          <Text style={{fontWeight: 'bold', color: colors.error}}>
            {t('buttonsModal.unConnectedShellyButton')}
          </Text>
        </View>
      )}
      {buttonNotReady && (
        <View style={{marginTop: 20}}>
          <Text style={{fontWeight: 'bold', color: colors.error}}>
            {t('buttonsModal.buttonNotReady')}
          </Text>
        </View>
      )}
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
          marginTop: 30
        }}>
        {!urlConfigButton && (
          <Button
            icon="arrow-left"
            textColor={
              theme.dark ? colors.onSurface : colors.onPrimaryContainer
            }
            theme={theme}
            disabled={(savingData || sendSetButton) ?? false}
            onPress={() => backButton('')}
            mode="elevated">
            {t('general.back')}
          </Button>
        )}
        <Button
          icon={
            savingData || sendSetButton
              ? () => (
                  <View style={{height: 25}}>
                    <CustomLoader visible label={''} />
                  </View>
                )
              : 'check'
          }
          theme={theme}
          disabled={(savingData || sendSetButton) ?? false}
          onPress={() =>
            urlConfigButton ? saveButton() : setSendSetButton(true)
          }
          // disabled={urlConfigButton ? true : false}
          mode="elevated">
          {t('general.continue')}
        </Button>
      </View>
    </View>
  );
};

export default AddButtonForm;
