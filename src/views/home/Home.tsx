import {backgroundStyle} from '@src/globals/styles/screenMode';
import {backAction} from '@src/hooks/home/homeHook';
import {actualTheme} from '@src/types/contextTypes';
import {HomeProps} from '@src/types/globalTypes';
import {useEffect} from 'react';
import {BackHandler, SafeAreaView} from 'react-native';
import {Text} from 'react-native-paper';
const Home = ({navigation, route}: HomeProps) => {
  const {colors, theme, dark} = actualTheme();

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
    <SafeAreaView style={backgroundStyle}>
      <Text>Home</Text>
    </SafeAreaView>
  );
};

export default Home;
