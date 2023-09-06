import {ButtonsListProps} from '@src/types/globalTypes';
import {t} from 'i18next';
import {Fragment} from 'react';
import {ScrollView} from 'react-native';
import {Title} from 'react-native-paper';
import {buttonsListStyles} from './styles/buttonsList';

const ButtonsList = ({
  height = 400,
  width = 320,
  children
}: ButtonsListProps) => {
  return (
    <Fragment>
      <Title style={[buttonsListStyles.title]}>{t('buttonsModal.title')}</Title>
      <ScrollView style={{height, width}}>{children}</ScrollView>
    </Fragment>
  );
};

export default ButtonsList;
