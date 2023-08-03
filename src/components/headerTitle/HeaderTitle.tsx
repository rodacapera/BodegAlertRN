import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {isDarkMode} from '@src/globals/styles/screenMode';
import {darkTheme} from '@src/hooks/darkMode';
import {lightTheme} from '@src/hooks/lightMode';
import {StackNavigation} from '@src/types/globalTypes';
import {Text, View} from 'react-native';
import {IconButton} from 'react-native-paper';
import {headerStyles} from './styes/headerStyles';

const HeaderTitle = ({title}: {title: string}) => {
  const {goBack} = useNavigation<StackNavigation>();
  return (
    <View style={headerStyles.header}>
      <View style={headerStyles.arrowBackIcon}>
        <IconButton
          icon="arrow-left"
          mode="contained-tonal"
          iconColor={
            isDarkMode
              ? darkTheme.colors.primaryContainer
              : lightTheme.colors.onPrimaryContainer
          }
          style={{
            backgroundColor: 'transparent',
          }}
          onPress={() => goBack()}
        />
      </View>
      <Text style={headerStyles.title}>{title}</Text>
    </View>
  );
};

export default HeaderTitle;
