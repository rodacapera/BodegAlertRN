import {addButton} from '@src/globals/constants/fakeData';
import {Networks, showNetworks} from '@src/hooks/shellyActions';
import {ThemeContext} from '@src/types/contextTypes';
import {ButtonsModalProps} from '@src/types/globalTypes';
import {t} from 'i18next';
import {Fragment, useContext, useEffect, useState} from 'react';
import {AppState, TouchableOpacity, View} from 'react-native';
import {List, Modal} from 'react-native-paper';
import ButtonsList from '../buttonsList/ButtonsList';
import CustomLoader from '../customLoader/CustomLoader';
import TextWithCustomLink from '../textWithCustomLink/TextWithCustomLink';
import Header from './components/header/Header';
import {buttonsModalStyles} from './styles/buttonsModalStyles';

const ButtonsModal = ({visible, setVisible}: ButtonsModalProps) => {
  const [networks, setNetworks] = useState<Networks[]>();
  const [firsStep, setFirsStep] = useState(false);
  const hideModal = () => (setVisible(false), setNetworks(undefined));
  const networksStatus = !networks ? true : false;
  const {
    theme: {colors},
    theme
  } = useContext(ThemeContext);

  const getMyNetworks = async () => {
    if (!networks || networks == undefined) {
      const networksResult = await showNetworks();
      networksResult[0].error
        ? setNetworks(undefined)
        : setNetworks(networksResult);
    }
  };

  useEffect(() => {
    getMyNetworks();
  }, [networks]);

  useEffect(() => {
    const appMode = AppState.addEventListener(
      'change',
      value => value === 'active' && getMyNetworks()
    );
    return () => appMode.remove();
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
            : colors.background
        }
      ]}>
      <View style={buttonsModalStyles.modalContent}>
        <Header visible={networksStatus} />
        <CustomLoader visible={networksStatus} label={t('general.scanning')} />
        {networks && networks[0].name && (
          <Fragment>
            {!firsStep ? (
              <ButtonsList height={400} width={320}>
                {networks.map((value, index) => {
                  return (
                    <TouchableOpacity
                      style={buttonsModalStyles.button}
                      key={index}>
                      <List.Item
                        theme={theme}
                        title={value.name}
                        description={'Some description'}
                        left={props => <List.Icon {...props} icon="wifi" />}
                      />
                    </TouchableOpacity>
                  );
                })}
              </ButtonsList>
            ) : (
              <></>
            )}
          </Fragment>
        )}
        <TextWithCustomLink
          text={t('buttonsModal.helperFooterQrFirst')}
          link={addButton}
          visible={networksStatus}
        />
      </View>
    </Modal>
  );
};

export default ButtonsModal;
