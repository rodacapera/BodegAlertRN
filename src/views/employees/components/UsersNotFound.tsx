import {user_not_found} from '@src/assets/images';
import CustomImage from '@src/components/customImage/CustomImage';
import TextWithCustomLink from '@src/components/textWithCustomLink/TextWithCustomLink';
import {ThemeContext} from '@src/types/contextTypes';
import {t} from 'i18next';
import {useContext} from 'react';
import {View} from 'react-native';
import {employeeStyles} from '../styles/employeesStyles';
import {userNotFoundVideoUrl} from '@src/globals/constants/fakeData';

const UsersNotFound = () => {
  const {
    theme: {colors},
    theme,
  } = useContext(ThemeContext);
  return (
    <View>
      <CustomImage source={user_not_found} style={employeeStyles} />
      <TextWithCustomLink
        text={t('employeesView.employeeNotFound')}
        link={userNotFoundVideoUrl}
      />
    </View>
  );
};

export default UsersNotFound;
