import {config} from '@src/hooks/config/config';
import {getDynamicLinkFirebase} from '@src/hooks/firebase/dynamicLink/dynamicLink';
import {GetUserQuery} from '@src/reactQuery/UserQuery';
import {actualTheme} from '@src/types/contextTypes';
import {QrModalProps} from '@src/types/globalTypes';
import {User} from '@src/types/userTypes';
import {t} from 'i18next';
import {useEffect, useState} from 'react';
import {View} from 'react-native';
import {Caption, Modal} from 'react-native-paper';
import QRCode from 'react-native-qrcode-svg';
import {logo_app} from '../../assets/images';
import TextWithCustomLink from '../textWithCustomLink/TextWithCustomLink';
import {qrModalStyles} from './styles/qrModalStyles';

const white = 'white';

const QrModal = ({visible, setVisible}: QrModalProps) => {
  const hideModal = () => setVisible(false);
  const [qrLink, setQrLink] = useState<string>();
  const {colors, theme} = actualTheme();
  const {data} = GetUserQuery();
  const user = data.user as unknown as User;
  const {videoLinks} = config();

  const getQrLink = async () => {
    const shop_id = user.shop.split('/')[1];
    const result = await getDynamicLinkFirebase(shop_id);
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
          backgroundColor: theme.dark ? colors.background : colors.background
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
        <View
          style={{
            backgroundColor: white,
            width: '100%',
            height: 350,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 10
          }}>
          <QRCode
            value={qrLink}
            size={300}
            logo={logo_app}
            logoSize={50}
            logoBackgroundColor="white"
            logoBorderRadius={80}
            color={theme.dark ? colors.surface : colors.onPrimaryContainer}
          />
        </View>
        <TextWithCustomLink
          text={t('qrModal.helperFooterQrFirst')}
          link={videoLinks?.addUserVideo}
          visible
        />
      </View>
    </Modal>
  );
};

export default QrModal;
