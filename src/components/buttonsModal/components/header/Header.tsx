import {shelly_button} from '@src/assets/images';
import CustomImage from '@src/components/customImage/CustomImage';
import {ThemeContext} from '@src/types/contextTypes';
import {t} from 'i18next';
import {useContext} from 'react';
import {View} from 'react-native';
import {Caption} from 'react-native-paper';
import {buttonsModalStyles} from '../../styles/buttonsModalStyles';

const Header = ({visible}: {visible: boolean}) => {
  const {
    theme: {colors},
  } = useContext(ThemeContext);
  return visible ? (
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
  ) : (
    <></>
  );
};

export default Header;
