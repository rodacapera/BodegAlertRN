import {backAction} from '@src/hooks/home/homeHook';
import {HomeProps} from '@src/types/globalTypes';
import {useEffect} from 'react';
import {BackHandler, View} from 'react-native';
import CustomMap from './components/map/CustomMap';
import {homeStyles} from './styles/homeStyles';

const Home = ({navigation, route}: HomeProps) => {
  useEffect(() => {
    navigation.getParent()?.setOptions({
      headerShown: true
    });
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () =>
      backAction(navigation)
    );
    return () => backHandler.remove();
  }, []);

  return (
    <View style={homeStyles.container}>
      <CustomMap />
    </View>
  );
};

export default Home;
