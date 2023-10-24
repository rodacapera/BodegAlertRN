import {Button} from '@src/types/buttons';
import {actualTheme} from '@src/types/contextTypes';
import {t} from 'i18next';
import {View} from 'react-native';
import {Caption, Text} from 'react-native-paper';

const ButtonFound = ({buttonFind}: {buttonFind: Button}) => {
  const {colors, dark} = actualTheme();
  return (
    <View>
      <Caption
        style={{lineHeight: 16, marginBottom: 10, color: colors.onSurface}}>
        {t('buttonsView.buttonFindTitle')}
      </Caption>
      <Text
        style={{
          fontWeight: 'bold',
          color: colors.onSurface
        }}>
        {t('buttonsView.button')}
      </Text>
      <Text
        style={{
          color: colors.onSurface
        }}>
        {'   '}
        {t('buttonsView.buttonStatus')}:{' '}
        {buttonFind.connected
          ? t('buttonsView.buttonConnected')
          : t('buttonsView.buttonUnconnected')}
      </Text>
      <Text
        style={{
          color: colors.onSurface
        }}>
        {'   '}
        {t('buttonsView.buttonIp')}: {buttonFind.ip}
      </Text>
    </View>
  );
};

export default ButtonFound;
