import {HomeProps} from '@src/types/globalTypes';
import React, {useContext, useEffect} from 'react';
import {SafeAreaView, StatusBar} from 'react-native';
import {Text} from 'react-native-paper';
import {backgroundStyle} from '@src/globals/styles/screenMode';
import {ThemeContext} from '@src/hooks/context/themeContext/ThemeContext';
const Home = ({navigation, route}: HomeProps) => {
  const {theme} = useContext(ThemeContext);
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
