import {actualTheme} from '@src/types/contextTypes';
import {TextWithCustomLinkProps} from '@src/types/globalTypes';
import {t} from 'i18next';
import {View} from 'react-native';
import {Paragraph} from 'react-native-paper';
import CustomLink from '../customLink/CustomLink';
import {qrModalStyles} from '../qrModal/styles/qrModalStyles';

const TextWithCustomLink = ({text, link, visible}: TextWithCustomLinkProps) => {
  const {colors, dark} = actualTheme();
  return visible ? (
    <View style={qrModalStyles.linkText}>
      <Paragraph
        style={{
          color: colors.onSurface
        }}>
        {text}{' '}
        <CustomLink
          text={t('general.here')}
          link={link} //get register video link from youtube
          underline
          color={dark ? colors.secondary : colors.primary}
        />
      </Paragraph>
    </View>
  ) : (
    <></>
  );
};

export default TextWithCustomLink;
