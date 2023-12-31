import {t} from 'i18next';
import {View} from 'react-native';
import CustomLoader from '../customLoader/CustomLoader';
import {customLoadingOverlayStyles} from './styles/customLoadingOverlayStyles';

const transparentColor = 'transparent';
const whiteOpacity = 'rgba(255,255,255, 0.60)';

const CustomLoadingOverlay = ({
  visible,
  transparent,
  dots = true,
  label
}: {
  visible: boolean;
  transparent?: boolean;
  dots?: boolean;
  label?: string;
}) => {
  return visible ? (
    <View
      style={[
        customLoadingOverlayStyles.container,
        {
          backgroundColor: transparent ? transparentColor : whiteOpacity
        }
      ]}>
      <View style={customLoadingOverlayStyles.loader}>
        <CustomLoader
          visible={visible}
          size="large"
          label={label ?? t('general.loading')}
          dots={dots}
        />
      </View>
    </View>
  ) : (
    <></>
  );
};

export default CustomLoadingOverlay;
