import {user_not_found} from '@src/assets/images';
import CustomImage from '@src/components/customImage/CustomImage';
import TextWithCustomLink from '@src/components/textWithCustomLink/TextWithCustomLink';
import {userNotFoundVideoUrl} from '@src/globals/constants/fakeData';
import {t} from 'i18next';
import {View} from 'react-native';
import {employeeStyles} from '../styles/employeesStyles';

const UsersNotFound = () => {
  return (
    <View>
      <CustomImage source={user_not_found} style={employeeStyles} />
      <TextWithCustomLink
        text={t('employeesView.employeeNotFound')}
        link={userNotFoundVideoUrl}
        visible
      />
    </View>
  );
};

export default UsersNotFound;
