import {t} from 'i18next';
import {View} from 'react-native';
import CustomLoader from '../customLoader/CustomLoader';
import {customLoadingOverlayStyles} from './styles/customLoadingOverlayStyles';

const CustomLoadingOverlay = ({visible}: {visible: boolean}) => {
  return visible ? (
    <View style={customLoadingOverlayStyles.container}>
      <View style={customLoadingOverlayStyles.loader}>
        <CustomLoader
          visible={visible}
          size="large"
          label={t('general.loading')}
        />
      </View>
    </View>
  ) : (
    <></>
  );
};

export default CustomLoadingOverlay;
