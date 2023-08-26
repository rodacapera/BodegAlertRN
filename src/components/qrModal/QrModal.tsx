import {ThemeContext} from '@src/types/contextTypes';
import {QrModalProps} from '@src/types/globalTypes';
import {t} from 'i18next';
import {useContext, useState} from 'react';
import {View} from 'react-native';
import {Caption, Modal, Text} from 'react-native-paper';
import QRCode from 'react-native-qrcode-svg';
import {logo_app} from '../../assets/images';
import CustomLink from '../customLink/CustomLink';
import {qrModalStyles} from './styles/arModalStyles';

const QrModal = ({visible, setVisible}: QrModalProps) => {
  const [myQr, setMyQr] = useState<string>('http://awesome.link.qr');
  const hideModal = () => setVisible(false);
  const {
    theme: {colors},
    theme,
  } = useContext(ThemeContext);
  return (
    <Modal
      visible={visible}
      onDismiss={hideModal}
      contentContainerStyle={[
        qrModalStyles.modalContainer,
        {backgroundColor: colors.background},
      ]}>
      <View style={qrModalStyles.modalContent}>
        <Caption
          style={{
            fontSize: 18,
            paddingTop: 20,
            paddingBottom: 30,
            textAlign: 'center',
            color: colors.onSurface,
          }}>
          {t('qrModal.helperTitleQr')}
        </Caption>
        <QRCode
          value={myQr}
          size={300}
          logo={logo_app}
          logoSize={50}
          logoBackgroundColor="white"
          logoBorderRadius={80}
          color={theme.dark ? colors.onPrimary : colors.onPrimaryContainer}
        />
        <View style={qrModalStyles.linkText}>
          <Text style={{color: colors.onSurface}}>
            {t('qrModal.helperFooterQrFirst')}{' '}
          </Text>
          <CustomLink
            text={t('qrModal.helperFooterQrSecond')}
            link="www.google.com" //get register video link from youtube
            underline
            color={theme.dark ? colors.secondary : colors.onPrimaryContainer}
          />
        </View>
      </View>
    </Modal>
  );
};

export default QrModal;
