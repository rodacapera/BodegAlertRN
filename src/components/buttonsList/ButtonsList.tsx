import {networks} from '@src/globals/constants/fakeData';
import {ThemeContext} from '@src/types/contextTypes';
import {t} from 'i18next';
import {Fragment, useContext} from 'react';
import {ScrollView, TouchableOpacity} from 'react-native';
import {List, Title} from 'react-native-paper';
import {buttonsListStyles} from './styles/buttonsList';
import {ButtonsListProps} from '@src/types/globalTypes';

const ButtonsList = ({
  height = 400,
  width = 320,
  children,
}: ButtonsListProps) => {
  const {
    theme: {colors},
    theme,
  } = useContext(ThemeContext);

  return (
    <Fragment>
      <Title
        style={[
          buttonsListStyles.title,
          {
            color: colors.onSurface,
          },
        ]}>
        {t('buttonsModal.title')}
      </Title>
      <ScrollView style={{height, width}}>{children}</ScrollView>
    </Fragment>
  );
};

export default ButtonsList;
