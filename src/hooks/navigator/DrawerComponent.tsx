import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItem
} from '@react-navigation/drawer';
import {useNavigation} from '@react-navigation/native';
import {shop} from '@src/globals/constants/fakeData';
import {StackNavigation} from '@src/types/globalTypes';
import {t} from 'i18next';
import {Image, StatusBar, View} from 'react-native';
import {
  Avatar,
  Caption,
  Drawer,
  Paragraph,
  Switch,
  Text,
  Title
} from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {drawerComponentHook} from './hook/drawerComponentHook';
import {drawerComponentStyles} from './styles/drawerComponentStyles';

const DrawerComponent = (props: DrawerContentComponentProps) => {
  const navigation = useNavigation<StackNavigation>();
  const {
    handleLogout,
    onToggleSwitch,
    isDark,
    colors,
    theme,
    user,
    logos,
    counterEmployees,
    counterButtons,
    isLoading,
    imageAvatar
  } = drawerComponentHook(navigation);

  return isLoading ? (
    <></>
  ) : (
    <DrawerContentScrollView
      {...props}
      style={drawerComponentStyles.drawerContent}>
      <StatusBar
        backgroundColor={colors.onPrimary}
        animated={true}
        barStyle={isDark ? 'light-content' : 'dark-content'}
      />
      <View style={drawerComponentStyles.userInfoSection}>
        <Avatar.Image
          theme={{
            colors: {
              primary: isDark ? 'white' : 'black'
            }
          }}
          // style={{backgroundColor: colors.onBackground}}
          source={imageAvatar}
          size={50}
        />
        <Title style={[drawerComponentStyles.title, {color: colors.onSurface}]}>
          {user?.name} {user?.lastname}
        </Title>
        <Caption
          numberOfLines={1}
          style={[drawerComponentStyles.caption, {color: colors.onSurface}]}>
          {t('drawer.groupName')} : {user?.group_name}
        </Caption>
        <Caption
          numberOfLines={1}
          style={[drawerComponentStyles.caption, {color: colors.onSurface}]}>
          {t('drawer.aliasName')} : {user?.alias}
        </Caption>
        <View style={drawerComponentStyles.row}>
          {user?.administrator && (
            <View style={drawerComponentStyles.section}>
              <Paragraph
                style={[
                  drawerComponentStyles.paragraph,
                  drawerComponentStyles.caption,
                  {color: colors.onSurface}
                ]}>
                {counterEmployees}
              </Paragraph>
              <Caption
                style={[
                  drawerComponentStyles.caption,
                  {color: colors.onSurfaceDisabled}
                ]}>
                {t('drawer.users')}
              </Caption>
            </View>
          )}
          <View style={drawerComponentStyles.section}>
            <Paragraph
              style={[
                drawerComponentStyles.paragraph,
                drawerComponentStyles.caption,
                {color: colors.onSurface}
              ]}>
              {counterButtons}
            </Paragraph>
            <Caption
              style={[
                drawerComponentStyles.caption,
                {color: colors.onSurfaceDisabled}
              ]}>
              {t('drawer.buttons')}
            </Caption>
          </View>
        </View>
      </View>

      {/* <DrawerItemList {...props} /> */}
      <Drawer.Section style={drawerComponentStyles.drawerSection}>
        <DrawerItem
          icon={({size}) => (
            <MaterialCommunityIcons
              name="home"
              color={colors.onSurface}
              size={size}
            />
          )}
          labelStyle={{color: colors.onSurface}}
          label={t('drawer.home')}
          onPress={() =>
            navigation.navigate('Home', {isLogin: false, isBack: true})
          }
        />
        <DrawerItem
          icon={({size}) => (
            <MaterialCommunityIcons
              name="account-outline"
              color={colors.onSurface}
              size={size}
            />
          )}
          labelStyle={{color: colors.onSurface}}
          label={t('drawer.profile')}
          onPress={() =>
            navigation.navigate('Profile', {administrator: false, shop})
          }
        />
        <DrawerItem
          icon={({size}) => (
            <MaterialCommunityIcons
              name="account-group"
              color={colors.onSurface}
              size={size}
            />
          )}
          labelStyle={{color: colors.onSurface}}
          label={t('drawer.users')}
          onPress={() => navigation.navigate('Employees')}
        />
        <DrawerItem
          icon={({size}) => (
            <MaterialCommunityIcons
              name="tune"
              color={colors.onSurface}
              size={size}
            />
          )}
          labelStyle={{color: colors.onSurface}}
          label={t('drawer.buttons')}
          onPress={() => navigation.navigate('Buttons')}
        />
        <DrawerItem
          icon={({size}) => (
            <MaterialCommunityIcons
              name="bell"
              color={colors.onSurface}
              size={size}
            />
          )}
          labelStyle={{color: colors.onSurface}}
          label={t('drawer.notify')}
          onPress={() => navigation.navigate('Notify')}
        />
      </Drawer.Section>
      <Drawer.Section theme={theme} title="Preferences">
        <View style={drawerComponentStyles.preference}>
          <Text style={{color: colors.onSurface}}>{t('drawer.darkTheme')}</Text>
          <View>
            <Switch value={isDark} onValueChange={onToggleSwitch} />
          </View>
        </View>
      </Drawer.Section>
      {user?.city != 'bogota' && (
        <Drawer.Section
          style={[drawerComponentStyles.drawerSection, {marginBottom: 20}]}>
          <Title
            style={[
              drawerComponentStyles.titleLogos,
              {color: colors.onSurface}
            ]}>
            {t('drawer.supportingEntities')}
          </Title>
          <View style={drawerComponentStyles.logos}>
            {logos?.map((value, index) => {
              return (
                <Image
                  source={{
                    uri: value.path
                  }}
                  style={drawerComponentStyles.imagesLogos}
                  key={index}
                />
              );
            })}
          </View>
          <DrawerItem
            icon={({size}) => (
              <MaterialCommunityIcons
                name="logout"
                color={colors.onSurface}
                size={size}
              />
            )}
            labelStyle={{color: colors.onSurface}}
            label={t('logOut')}
            onPress={handleLogout}
          />
        </Drawer.Section>
      )}
    </DrawerContentScrollView>
  );
};
export default DrawerComponent;
