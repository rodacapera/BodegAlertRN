import {addButton} from '@src/globals/constants/fakeData';
import {ThemeContext} from '@src/types/contextTypes';
import {ButtonsModalProps} from '@src/types/globalTypes';
import {t} from 'i18next';
import {useContext, useEffect, useState} from 'react';
import {View, TouchableOpacity, ScrollView} from 'react-native';
import {Caption, List, Modal, Text, Title} from 'react-native-paper';
import TextWithCustomLink from '../textWithCustomLink/TextWithCustomLink';
import {Networks, showNetworks} from '@src/hooks/shellyActions';
import CustomImage from '../customImage/CustomImage';
import {shelly_button} from '@src/assets/images';
import {buttonsModalStyles} from './styles/buttonsModalStyles';

const ButtonsModal = ({visible, setVisible}: ButtonsModalProps) => {
  const [networks, setNetworks] = useState<Networks[]>();
  const hideModal = () => setVisible(false);
  const {
    theme: {colors},
    theme,
  } = useContext(ThemeContext);

  const getMyNetworks = async () => {
    const networksResult = await showNetworks();
    console.log('myNetworks', networksResult);
    networksResult && setNetworks(networksResult);
  };
  useEffect(() => {
    getMyNetworks();
  }, []);

  return (
    <Modal
      visible={visible}
      onDismiss={hideModal}
      contentContainerStyle={[
        buttonsModalStyles.modalContainer,
        {
          backgroundColor: theme.dark
            ? colors.surfaceVariant
            : colors.background,
        },
      ]}>
      <View style={buttonsModalStyles.modalContent}>
        {!networks && (
          <View style={buttonsModalStyles.helperCaption}>
            <CustomImage source={shelly_button} style={buttonsModalStyles} />
            <Caption
              style={[
                buttonsModalStyles.title,
                {
                  color: colors.onSurface,
                },
              ]}>
              {t('buttonsModal.helperTitleQr')}
            </Caption>
          </View>
        )}

        {networks && (
          <Title
            style={{
              color: colors.onSurface,
              marginVertical: 10,
              fontWeight: 'bold',
            }}>
            {t('buttonsModal.title')}
          </Title>
        )}

        {networks && (
          <ScrollView
            style={{
              height: 360,
              width: 320,
            }}>
            {networks.map((value, index) => {
              return (
                <TouchableOpacity
                  style={{
                    borderColor: '#ccc',
                    borderWidth: 1,
                    margin: 3,
                    borderRadius: 6,
                  }}
                  key={index}>
                  <List.Item
                    theme={theme}
                    title={value.name}
                    description="Item description"
                    left={props => <List.Icon {...props} icon="wifi" />}
                  />
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        )}
        {/* </View> */}

        <TextWithCustomLink
          text={t('buttonsModal.helperFooterQrFirst')}
          link={addButton}
        />
      </View>
    </Modal>
  );
};

export default ButtonsModal;
