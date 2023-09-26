import {backAction} from '@src/hooks/home/homeHook';
import {headerShown} from '@src/hooks/navigator/headerShown';
import {actualTheme} from '@src/types/contextTypes';
import {HomeProps} from '@src/types/globalTypes';
import {useEffect} from 'react';
import {BackHandler, View} from 'react-native';
import CustomMap from './components/customMap/CustomMap';
import {homeStyles} from './styles/homeStyles';

const Home = ({navigation, route}: HomeProps) => {
  const {colors, theme, dark} = actualTheme();
  const focus = navigation.isFocused();

  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () =>
      backAction(navigation)
    );
    return () => backHandler.remove();
  }, []);

  useEffect(() => {
    headerShown({
      navigation,
      visible: true,
      transparent: true,
      titleColor: colors.onPrimaryContainer
    });
  });

  return (
    <View style={homeStyles.container}>
      <CustomMap />
    </View>
  );
};

export default Home;
