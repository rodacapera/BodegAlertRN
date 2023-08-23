import {ButtonsProps} from '@src/types/globalTypes';
import {SafeAreaView, Text} from 'react-native';

const Buttons = ({navigation, route}: ButtonsProps) => {
  return (
    <SafeAreaView>
      <Text>Buttons</Text>
    </SafeAreaView>
  );
};

export default Buttons;
