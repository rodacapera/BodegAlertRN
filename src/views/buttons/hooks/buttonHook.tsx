import {useNavigation} from '@react-navigation/native';
import {removeButtonByIdFirebase} from '@src/hooks/firebase/buttons/buttons';
import {headerShown} from '@src/hooks/navigator/headerShown';
import {statusDevice} from '@src/hooks/shellyActions';
import {
  GetButtonsQuery,
  GetUserQuery,
  SetButtonsQuery
} from '@src/reactQuery/UserQuery';
import {ButtonFind, Buttons} from '@src/types/buttons';
import {actualTheme} from '@src/types/contextTypes';
import {StackNavigation} from '@src/types/globalTypes';
import {User} from '@src/types/userTypes';
import {useCallback, useEffect, useState} from 'react';
import {
  AppState,
  Platform,
  useColorScheme,
  useWindowDimensions
} from 'react-native';

const Buttonhook = () => {
  const {width} = useWindowDimensions();
  const colorScheme = useColorScheme();
  const navigation = useNavigation<StackNavigation>();
  const {colors, dark} = actualTheme();
  const userData = GetUserQuery().data.user;
  const user = userData as unknown as User;
  const {isLoading, data} = GetButtonsQuery();
  const buttons = data as Buttons[];
  const [alertVisible, setAlertVisible] = useState(false);
  const [visible, setVisible] = useState(false);
  const [buttonFind, setButtonFind] = useState<ButtonFind>();
  const [refreshing, setRefreshing] = useState(false);
  const [itemToRemove, setItemToRemove] = useState<string>();
  const [sendRemoveItem, setSendRemoveItem] = useState(false);
  const [newButtons, setNewButtons] = useState<Buttons[]>(buttons);
  SetButtonsQuery(newButtons);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    !refreshing &&
      setTimeout(() => {
        setRefreshing(false);
        buttonFind && buttonFind.ip == '' ? getDevice() : setButtonFind(null);
      }, 2000);
  }, []);

  const removeItem = (index: string) => {
    setItemToRemove(index);
    setAlertVisible(true);
  };

  const removeButton = () => {
    if (itemToRemove) {
      removeButtonByIdFirebase(itemToRemove)
        .then(result => {
          const newButtons = [...buttons];
          const resultFilter = newButtons.filter(
            value => value.uid != itemToRemove
          );
          setNewButtons(resultFilter);
        })
        .catch(err => console.debug(err));
    }
  };

  useEffect(() => {
    setTimeout(() => {
      buttons.length > 0 && setNewButtons(buttons);
    }, 1000);
  }, [buttons]);

  useEffect(() => {
    sendRemoveItem && removeButton();
  }, [sendRemoveItem]);

  const getDevice = () => {
    statusDevice().then(result => {
      if (result) {
        setButtonFind({
          isValid: result.is_valid,
          connected: result.wifi_sta.connected,
          ip: result.wifi_sta.ip
        });
      } else {
        !buttonFind &&
          setButtonFind({isValid: false, connected: false, ip: ''});
      }
    });
  };

  useEffect(() => {
    !buttonFind && getDevice();
  }, [buttonFind]);

  useEffect(() => {
    const appMode = AppState.addEventListener(
      'change',
      value => value === 'active' && getDevice()
    );
    return () => appMode.remove();
  }, []);

  useEffect(() => {
    headerShown({
      width: width,
      navigation,
      visible: true,
      transparent: false,
      titleColor:
        Platform.OS == 'android'
          ? colorScheme === 'dark'
            ? '#a23234'
            : dark
            ? colors.onSurface
            : colors.onPrimaryContainer
          : colors.onPrimaryContainer
    });
  });

  return {
    alertVisible,
    setAlertVisible,
    removeItem,
    buttons: newButtons,
    visible,
    setVisible,
    isLoading,
    data,
    buttonFind,
    onRefresh,
    refreshing,
    setButtonFind,
    setSendRemoveItem,
    setNewButtons,
    user
  };
};
export {Buttonhook};
