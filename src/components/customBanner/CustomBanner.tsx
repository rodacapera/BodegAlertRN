import {actualTheme} from '@src/types/contextTypes';
import {CustomBannerProps} from '@src/types/globalTypes';
import {useColorScheme} from 'react-native';
import {Banner} from 'react-native-paper';

const CustomBanner = ({actions, visible, text, icon}: CustomBannerProps) => {
  const {colors, dark} = actualTheme();
  const colorScheme = useColorScheme();
  return (
    <Banner
      contentStyle={{
        maxWidth: '100%',
        backgroundColor:
          colorScheme == 'dark'
            ? dark
              ? colors.onError
              : colors.onPrimaryContainer
            : dark
            ? colors.onErrorContainer
            : colors.errorContainer
      }}
      visible={visible}
      actions={actions}
      icon={icon}>
      {text}
    </Banner>
  );
};

export default CustomBanner;
