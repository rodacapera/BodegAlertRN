import {FAB} from 'react-native-paper';
import {customFabStyles} from './styles/customFabStyles';
import {ViewStyle} from 'react-native';
import {useEffect, useState} from 'react';
import {CustomFabProps, CustomFabStyles} from '@src/types/globalTypes';
import {validatePosition} from './hooks/customFabHook';

const CustomFab = ({onPress, icon, styles}: CustomFabProps) => {
  const [currentStyle, setCurrentStyle] = useState<ViewStyle>(
    customFabStyles.bottomRight
  );

  useEffect(() => {
    validatePosition(styles, setCurrentStyle);
  }, [styles]);

  return <FAB icon={icon} style={currentStyle} onPress={() => onPress(true)} />;
};
export default CustomFab;
