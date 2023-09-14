import {FAB} from 'react-native-paper';
import {customFabStyles} from './styles/customFabStyles';
import {ViewStyle} from 'react-native';
import {useEffect, useState} from 'react';
import {CustomFabProps, CustomFabStyles} from '@src/types/globalTypes';
import {validatePosition} from './hooks/customFabHook';
import {backgroundStyle} from '@src/globals/styles/screenMode';

const CustomFab = ({
  onPress,
  icon,
  position,
  style,
  label = '',
  iconColor = 'black'
}: CustomFabProps) => {
  const [currentPosition, setCurrentPosition] = useState<ViewStyle>(
    customFabStyles.bottomRight
  );

  useEffect(() => {
    validatePosition(position, setCurrentPosition);
  }, [position]);

  return (
    <FAB
      icon={icon}
      label={label}
      color={iconColor ?? undefined}
      style={[currentPosition, style]}
      onPress={() => onPress(true)}
    />
  );
};
export default CustomFab;
