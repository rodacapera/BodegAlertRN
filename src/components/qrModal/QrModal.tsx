import {addUserVideo} from '@src/globals/constants/fakeData';
import {actualTheme} from '@src/types/contextTypes';
import {QrModalProps} from '@src/types/globalTypes';
import {t} from 'i18next';
import {View} from 'react-native';
import {Caption, Modal} from 'react-native-paper';
import QRCode from 'react-native-qrcode-svg';
import {logo_app} from '../../assets/images';
import TextWithCustomLink from '../textWithCustomLink/TextWithCustomLink';
import {qrModalStyles} from './styles/qrModalStyles';
import {getShopQuery} from '@src/reactQuery/userQuery';
import {Shop} from '@src/types/userTypes';
import {getDynamicLinkFirebase} from '@src/hooks/firebase/company/company';
import {useEffect, useState} from 'react';

const QrModal = ({visible, setVisible}: QrModalProps) => {
  const hideModal = () => setVisible(false);
  const [qrLink, setQrLink] = useState<string>();
  const {colors, theme} = actualTheme();
  const {data} = getShopQuery();

  const getQrLink = async () => {
    const shop = data as Shop;
    const result = await getDynamicLinkFirebase(JSON.stringify(shop));
    console.log('result', result);
    setQrLink(result);
  };

  useEffect(() => {
    getQrLink();
  }, []);

  return (
    <Modal
      visible={visible}
      onDismiss={hideModal}
      contentContainerStyle={[
        qrModalStyles.modalContainer,
        {
          backgroundColor: theme.dark
            ? colors.surfaceVariant
            : colors.background
        }
      ]}>
      <View style={qrModalStyles.modalContent}>
        <Caption
          style={[
            qrModalStyles.title,
            {
              color: colors.onSurface
            }
          ]}>
          {t('qrModal.helperTitleQr')}
        </Caption>
        <QRCode
          value={qrLink}
          size={300}
          logo={logo_app}
          logoSize={50}
          logoBackgroundColor="white"
          logoBorderRadius={80}
          color={theme.dark ? colors.onPrimary : colors.onPrimaryContainer}
        />
        <TextWithCustomLink
          text={t('qrModal.helperFooterQrFirst')}
          link={addUserVideo}
          visible
        />
      </View>
    </Modal>
  );
};

export default QrModal;
