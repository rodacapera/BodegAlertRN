import AsyncStorage, {
  useAsyncStorage,
} from '@react-native-async-storage/async-storage';
import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItem,
} from '@react-navigation/drawer';
import {t} from 'i18next';
import React, {useContext, useEffect, useState} from 'react';
import {Image, View} from 'react-native';
import {
  Avatar,
  Caption,
  Drawer,
  Paragraph,
  Switch,
  Text,
  Title,
} from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {drawerComponentStyles} from './styles/drawerComppnentStyles';
import {ThemeContext} from '../context/themeContext/ThemeContext';

const DrawerComponent = (props: DrawerContentComponentProps) => {
  const {navigation} = props;
  const {getItem, setItem} = useAsyncStorage('@theme');
  const [isDark, setIsDark] = useState(false);
  const {setDarkTheme, setLightTheme} = useContext(ThemeContext);

  const onToggleSwitch = () => {
    setIsDark(!isDark);
    !isDark ? setDarkTheme() : setLightTheme();
  };

  const handleClickButtonMenuDrawer = (path: string) => {
    navigation.navigate(path);
  };

  const validateSwitch = async () => {
    const item = await getItem();
    if (item) {
      setIsDark(item === 'dark' ? true : false);
    } else {
      setItem('light');
    }
  };

  useEffect(() => {
    validateSwitch();
  }, []);

  return (
    <DrawerContentScrollView {...props}>
      <View style={drawerComponentStyles.userInfoSection}>
        <Avatar.Image
          source={{
            uri: 'https://pbs.twimg.com/profile_images/952545910990495744/b59hSXUd_400x400.jpg',
          }}
          size={50}
        />
        <Title style={drawerComponentStyles.title}>Dawid Urbaniak</Title>
        <Caption style={drawerComponentStyles.caption}>Shop name</Caption>
        <View style={drawerComponentStyles.row}>
          <View style={drawerComponentStyles.section}>
            <Paragraph
              style={[
                drawerComponentStyles.paragraph,
                drawerComponentStyles.caption,
              ]}>
              3
            </Paragraph>
            <Caption style={drawerComponentStyles.caption}>
              {t('employees')}
            </Caption>
          </View>
          <View style={drawerComponentStyles.section}>
            <Paragraph
              style={[
                drawerComponentStyles.paragraph,
                drawerComponentStyles.caption,
              ]}>
              2
            </Paragraph>
            <Caption style={drawerComponentStyles.caption}>
              {t('buttons')}
            </Caption>
          </View>
        </View>
      </View>

      {/* <DrawerItemList {...props} /> */}
      <Drawer.Section style={drawerComponentStyles.drawerSection}>
        <DrawerItem
          icon={({color, size}) => (
            <MaterialCommunityIcons
              name="account-outline"
              color={color}
              size={size}
            />
          )}
          label="Profile"
          onPress={() => handleClickButtonMenuDrawer('Profile')}
        />
        <DrawerItem
          icon={({color, size}) => (
            <MaterialCommunityIcons
              name="account-group"
              color={color}
              size={size}
            />
          )}
          label="Users"
          onPress={() => handleClickButtonMenuDrawer('Users')}
        />
        <DrawerItem
          icon={({color, size}) => (
            <MaterialCommunityIcons name="tune" color={color} size={size} />
          )}
          label="Buttons"
          onPress={() => handleClickButtonMenuDrawer('Buttons')}
        />
      </Drawer.Section>
      <Drawer.Section title="Preferences">
        {/* <TouchableRipple onPress={() => setIsDark(!isDark)}> */}
        <View style={drawerComponentStyles.preference}>
          <Text>Dark Theme</Text>
          <View>
            <Switch value={isDark} onValueChange={onToggleSwitch} />
          </View>
        </View>
        {/* </TouchableRipple> */}
        {/* <TouchableRipple onPress={() => {}}>
          <View style={drawerComponentStyles.preference}>
            <Text>RTL</Text>
            <View pointerEvents="none">
              <Switch value={false} />
            </View>
          </View>
        </TouchableRipple> */}
      </Drawer.Section>
      <Drawer.Section style={drawerComponentStyles.drawerSection}>
        <Title style={drawerComponentStyles.titleLogos}>
          {t('guarantorEntities')}
        </Title>
        <View style={drawerComponentStyles.logos}>
          <Image
            source={{
              uri: 'https://www.florencia-caqueta.gov.co/sites/florenciacaqueta/content/files/000861/43037_pag-wb-escudo_200x200.png',
            }}
            style={drawerComponentStyles.imagesLogos}
          />
          <Image
            source={{
              uri: 'https://scontent.fbog2-5.fna.fbcdn.net/v/t39.30808-1/360098370_588153136823100_6601367482560876322_n.jpg?stp=dst-jpg_p200x200&_nc_cat=103&ccb=1-7&_nc_sid=c6021c&_nc_ohc=SBUR5C-j4zMAX-foIrh&_nc_ht=scontent.fbog2-5.fna&oh=00_AfDl3uT-tK7FGd_twV7CAf_Rkpfsaswq-hWCOz4koUu7vA&oe=64E8410C',
            }}
            style={drawerComponentStyles.imagesLogos}
          />
          <Image
            source={{
              uri: 'https://site.ccflorencia.org.co/wp-content/uploads/2022/01/icono-camara.png',
            }}
            style={drawerComponentStyles.imagesLogos}
          />
        </View>
        <DrawerItem
          icon={({color, size}) => (
            <MaterialCommunityIcons name="logout" color={color} size={size} />
          )}
          label={t('logOut')}
          onPress={() => console.log('logout')}
        />
      </Drawer.Section>
    </DrawerContentScrollView>
  );
};

export default DrawerComponent;
