import {HomeProps} from '@src/types/globalTypes';
import {View} from 'react-native';
import CustomMap from './components/customMap/CustomMap';
import {homeStyles} from './styles/homeStyles';

const Home = ({navigation, route}: HomeProps) => {
  return (
    <View style={homeStyles.container}>
      <CustomMap />
    </View>
  );
};

export default Home;
