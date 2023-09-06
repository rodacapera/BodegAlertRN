import {useNavigation} from '@react-navigation/native';
import {ThemeContext, actualTheme} from '@src/types/contextTypes';
import {StackNavigation} from '@src/types/globalTypes';
import {useContext} from 'react';
import {Text, View} from 'react-native';
import {IconButton} from 'react-native-paper';
import {headerStyles} from './styes/headerStyles';

const HeaderTitle = ({title}: {title: string}) => {
  const {goBack} = useNavigation<StackNavigation>();
  const {colors, theme, dark} = actualTheme();
  return (
    <View style={headerStyles.header}>
      <View style={headerStyles.arrowBackIcon}>
        <IconButton
          icon="arrow-left"
          mode="contained-tonal"
          iconColor={dark ? colors.onSurface : colors.onPrimaryContainer}
          style={{
            backgroundColor: 'transparent'
          }}
          onPress={() => goBack()}
        />
      </View>
      <Text
        style={[
          headerStyles.title,
          {
            color: dark ? colors.onSurface : colors.onPrimaryContainer
          }
        ]}
        numberOfLines={1}>
        {title}
      </Text>
    </View>
  );
};

export default HeaderTitle;
