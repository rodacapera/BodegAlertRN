import {ThemeContext} from '@src/types/contextTypes';
import {useContext} from 'react';
import {Avatar, Card, IconButton} from 'react-native-paper';
import {simpleRemoveItemCardsStyles} from './styles/simpleRemoveItemCards';

const SimpleRemoveItemCards = ({
  title,
  subtitle,
  index,
  removeItem,
}: {
  title: string;
  subtitle?: string;
  index: number;
  removeItem: (e: number) => void;
}) => {
  const {
    theme,
    theme: {colors},
  } = useContext(ThemeContext);
  const handleRemove = () => {};
  return (
    <Card.Title
      style={[
        simpleRemoveItemCardsStyles.container,
        {
          borderColor: theme.dark ? colors.onSurface : colors.onSurfaceDisabled,
        },
      ]}
      theme={theme}
      titleVariant="headlineSmall"
      titleStyle={{textTransform: 'capitalize', color: colors.onSurface}}
      title={title}
      subtitle={subtitle}
      subtitleStyle={{textTransform: 'capitalize', color: colors.onSurface}}
      left={props => <Avatar.Icon {...props} icon="account-star" />}
      right={props => (
        <IconButton
          {...props}
          icon={'delete'}
          iconColor={colors.onSurface}
          onPress={() => removeItem(index)}
        />
      )}
    />
  );
};

export default SimpleRemoveItemCards;