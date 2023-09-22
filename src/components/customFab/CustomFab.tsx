import {CustomFabProps} from '@src/types/globalTypes';
import {useEffect, useState} from 'react';
import {ViewStyle} from 'react-native';
import {FAB} from 'react-native-paper';
import {validatePosition} from './hooks/customFabHook';
import {customFabStyles} from './styles/customFabStyles';

const CustomFab = ({
  onPress,
  icon,
  position,
  style,
  label,
  iconColor
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
      color={iconColor}
      style={[currentPosition, style]}
      onPress={() => onPress(true)}
    />
  );
};
export default CustomFab;
