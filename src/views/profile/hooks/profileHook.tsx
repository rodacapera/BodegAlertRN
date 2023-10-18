import {useNavigation} from '@react-navigation/native';
import {actualTheme} from '@src/types/contextTypes';
import {StackNavigation} from '@src/types/globalTypes';

const profileHook = () => {
  const {colors, dark} = actualTheme();
  const navigation = useNavigation<StackNavigation>();
  return {};
};

export {profileHook};
