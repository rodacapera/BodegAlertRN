import {FAB} from 'react-native-paper';
import {customFabStyles} from './styles/customFabStyles';

const CustomFab = ({
  onPress,
  icon,
}: {
  icon: string;
  onPress: (e: boolean) => void;
}) => (
  <FAB icon={icon} style={customFabStyles.fab} onPress={() => onPress(true)} />
);
export default CustomFab;
