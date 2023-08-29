import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';
import {APP_NAME} from '@src/globals/constants/config';
import {ThemeContext} from '@src/types/contextTypes';
import {useContext} from 'react';
import {useWindowDimensions} from 'react-native';
import DrawerComponent from './DrawerComponent';
import NavigationProvider from './NavigationProvider';

export const LateralDrawer = () => {
  const {width} = useWindowDimensions();
  const MyDrawer = createDrawerNavigator();
  const {
    theme: {colors},
    theme: {dark},
    theme,
  } = useContext(ThemeContext);
  return (
    <NavigationContainer theme={theme}>
      <MyDrawer.Navigator
        screenOptions={{
          drawerType: width >= 768 ? 'permanent' : 'front',
          drawerActiveTintColor: dark ? colors.onSurface : colors.background,
          headerTintColor: dark ? colors.onSurface : colors.primary,
          headerTitleStyle: {
            fontSize: 26,
            fontWeight: 'bold',
          },
          headerStyle: {
            backgroundColor: colors.background,
          },

          // headerStyle: {
          //   borderWidth: 0,
          //   elevation: 0,
          //   shadowOpacity: 0,
          // },
          drawerStyle: {backgroundColor: colors.background},
          headerShown: false, // this remove header
          // drawerHideStatusBarOnOpen: true,
          //   overlayColor: 'transparent',
        }}
        drawerContent={props => <DrawerComponent {...props} />}>
        <MyDrawer.Screen
          name="StackNavigator"
          options={{
            title: APP_NAME,
          }}
          component={NavigationProvider}
        />
      </MyDrawer.Navigator>
    </NavigationContainer>
  );
};
