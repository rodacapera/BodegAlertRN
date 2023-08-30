import {View, Text} from 'react-native';
import React, {useContext} from 'react';
import {ActivityIndicator, Caption} from 'react-native-paper';
import {ThemeContext} from '@src/types/contextTypes';
import {CustomLoaderProps} from '@src/types/globalTypes';

const CustomLoader = ({label, visible}: CustomLoaderProps) => {
  const {
    theme: {colors},
  } = useContext(ThemeContext);
  return visible ? (
    <View>
      <ActivityIndicator animating={true} color={colors.secondary} />
      <Caption>{label}...</Caption>
    </View>
  ) : (
    <></>
  );
};

export default CustomLoader;
