import CustomFab from '@src/components/customFab/CustomFab';
import {actualTheme} from '@src/types/contextTypes';
import {t} from 'i18next';

const PanicButton = () => {
  const {colors, dark} = actualTheme();

  return (
    <CustomFab
      icon={'bell'}
      label={t('home.panicButton')}
      position={'bottomCenter'}
      onPress={() => console.log('click')}
      style={{
        backgroundColor: dark ? colors.onPrimary : colors.onErrorContainer,
        borderRadius: 50
      }}
      iconColor="white"
    />
  );
};

export default PanicButton;
