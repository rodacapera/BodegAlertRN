import {actualTheme} from '@src/types/contextTypes';
import {CustomLoaderProps} from '@src/types/globalTypes';
import {View} from 'react-native';
import {ActivityIndicator, Caption} from 'react-native-paper';

const CustomLoader = ({label, visible}: CustomLoaderProps) => {
  const {colors} = actualTheme();
  return visible ? (
    <View>
      <ActivityIndicator animating={true} color={colors.secondary} />
      <Caption style={{color: colors.onSurface}}>{label}...</Caption>
    </View>
  ) : (
    <></>
  );
};

export default CustomLoader;
