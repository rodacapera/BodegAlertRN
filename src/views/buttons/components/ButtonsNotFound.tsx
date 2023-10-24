import {user_not_found} from '@src/assets/images';
import CustomImage from '@src/components/customImage/CustomImage';
import TextWithCustomLink from '@src/components/textWithCustomLink/TextWithCustomLink';
import {config} from '@src/hooks/config/config';
import {t} from 'i18next';
import {View} from 'react-native';
import {buttonsStyles} from '../styles/buttonsStyles';

const ButtonsNotFound = () => {
  const {videoLinks} = config();

  return (
    <View>
      <CustomImage source={user_not_found} style={buttonsStyles} />
      <TextWithCustomLink
        text={t('buttonsView.buttonsNotFound')}
        link={videoLinks?.userNotFoundVideoUrl}
        visible
      />
    </View>
  );
};

export default ButtonsNotFound;