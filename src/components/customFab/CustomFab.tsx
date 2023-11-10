import {ActualTheme} from '@src/hooks/navigator/hook/GlobalTheme';
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
  iconColor,
  disabled = false
}: CustomFabProps) => {
  const {colors} = ActualTheme();
  const [currentPosition, setCurrentPosition] = useState<ViewStyle>(
    customFabStyles.bottomRight
  );

  useEffect(() => {
    validatePosition(position, setCurrentPosition);
  }, [position]);

  return (
    <FAB
      theme={{
        colors: {
          onSurfaceDisabled: colors.onSurfaceDisabled
        }
      }}
      icon={icon}
      label={label}
      color={iconColor}
      style={[currentPosition, style]}
      onPress={() => onPress(true)}
      disabled={disabled}
    />
  );
};
export default CustomFab;
