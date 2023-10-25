import {user_not_found} from '@src/assets/images';
import CustomImage from '@src/components/customImage/CustomImage';
import TextWithCustomLink from '@src/components/textWithCustomLink/TextWithCustomLink';
import {config} from '@src/hooks/config/config';
import {User} from '@src/types/userTypes';
import {t} from 'i18next';
import {View} from 'react-native';
import {employeeStyles} from '../styles/employeesStyles';

const UsersNotFound = ({user}: {user: User}) => {
  const {videoLinks} = config({user});
  return (
    <View>
      <CustomImage source={user_not_found} style={employeeStyles} />
      <TextWithCustomLink
        text={t('employeesView.employeeNotFound')}
        link={videoLinks?.userNotFoundVideoUrl}
        visible
      />
    </View>
  );
};

export default UsersNotFound;
