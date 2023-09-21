import {View} from 'react-native';
import CustomLoader from '../customLoader/CustomLoader';
import {customLoadingOverlayStyles} from './styles/customLoadingOverlayStyles';
import {t} from 'i18next';
import {useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';

const CustomLoadingOverlay = ({visible}: {visible: boolean}) => {
  const navigation = useNavigation();
  useEffect(() => {
    navigation.getParent()?.setOptions({
      headerShown: !visible
    });
  }, [visible]);

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
