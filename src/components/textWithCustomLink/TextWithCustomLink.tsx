import {ThemeContext} from '@src/types/contextTypes';
import {TextWithCustomLinkProps} from '@src/types/globalTypes';
import {t} from 'i18next';
import {useContext} from 'react';
import {View} from 'react-native';
import {Paragraph} from 'react-native-paper';
import CustomLink from '../customLink/CustomLink';
import {qrModalStyles} from '../qrModal/styles/qrModalStyles';

const TextWithCustomLink = ({text, link}: TextWithCustomLinkProps) => {
  const {
    theme: {colors},
    theme,
  } = useContext(ThemeContext);
  return (
    <View style={qrModalStyles.linkText}>
      <Paragraph
        style={{
          color: colors.onSurface,
        }}>
        {text}{' '}
        <CustomLink
          text={t('general.here')}
          link={link} //get register video link from youtube
          underline
          color={theme.dark ? colors.secondary : colors.primary}
        />
      </Paragraph>
    </View>
  );
};

export default TextWithCustomLink;
