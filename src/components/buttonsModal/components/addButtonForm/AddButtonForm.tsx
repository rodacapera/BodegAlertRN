import CustomIcon from '@src/components/customIcon/CustomIcon';
import {actualTheme} from '@src/types/contextTypes';
import {t} from 'i18next';
import {useState} from 'react';
import {View} from 'react-native';
import {Button, Caption, TextInput, Title} from 'react-native-paper';
import {buttonsModalStyles} from '../../styles/buttonsModalStyles';

const AddButtonForm = ({
  iss,
  backButton
}: {
  iss: string;
  backButton: (e: string) => void;
}) => {
  const [eye, setEye] = useState(false);
  const {colors, theme} = actualTheme();
  return (
    <View>
      <Title style={{fontWeight: 'bold', color: colors.onSurface}}>
        {t('buttonsModal.formTitle')}
      </Title>
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
        secureTextEntry={eye ? false : true}
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
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
          marginTop: 30
        }}>
        <Button
          icon="arrow-left"
          textColor={theme.dark ? colors.onSurface : colors.onPrimaryContainer}
          theme={theme}
          onPress={() => backButton('')}
          mode="elevated">
          {t('general.back')}
        </Button>
        <Button
          icon="check"
          theme={theme}
          onPress={() => console.log('continue functionality')}
          mode="elevated">
          {t('general.continue')}
        </Button>
      </View>
    </View>
  );
};

export default AddButtonForm;
