import {backgroundStyle} from '@src/globals/styles/screenMode';
import {ThemeContext} from '@src/types/contextTypes';
import {HomeProps} from '@src/types/globalTypes';
import {useContext, useEffect} from 'react';
import {SafeAreaView} from 'react-native';
import {Text} from 'react-native-paper';
const Home = ({navigation, route}: HomeProps) => {
  const {
    theme: {dark},
  } = useContext(ThemeContext);
  useEffect(() => {
    navigation.getParent()?.setOptions({
      headerShown: true,
    });
  }, []);

  return (
    <SafeAreaView style={backgroundStyle}>
      <Text>Home</Text>
    </SafeAreaView>
  );
};

export default Home;
