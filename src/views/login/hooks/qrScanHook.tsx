import {useNavigation} from '@react-navigation/native';
import {setShopQuery} from '@src/reactQuery/userQuery';
import {StackNavigation} from '@src/types/globalTypes';
import {Shop} from '@src/types/userTypes';
import {useState} from 'react';
import {DimensionValue, View} from 'react-native';
import {RNCamera} from 'react-native-camera';

const qrScanHook = () => {
  const {navigate} = useNavigation<StackNavigation>();
  const [flash, setFlash] = useState(RNCamera.Constants.FlashMode.off);
  const [shopId, setShopId] = useState<string>();
  const {data} = setShopQuery(shopId);
  const onSuccess = (e: {data: string}) => {
    console.log('uuuu', e.data);
    const urla = decodeURI(e.data);
    console.log('urla', urla);

    const url = e.data.split('=')[6];
    console.log('url', url);

    const urlDecode = decodeURI(url);
    console.log('urlDecode', urlDecode);

    const shop_id = urlDecode.split('%3D')[2];
    console.log('shop', shop_id);
    setShopId(shop_id);
    navigate('Register', {administrator: false, qr: true});
    // Linking.openURL(e.data).catch(err =>
    //   console.error('An error occured', err)
    // );
  };

  const marker = (
    color: string,
    size: DimensionValue,
    borderLength: DimensionValue,
    thickness: number = 2,
    borderRadius: number = 0
  ): JSX.Element => {
    return (
      <View style={{height: size, width: size}}>
        <View
          style={{
            position: 'absolute',
            height: borderLength,
            width: borderLength,
            top: 0,
            left: 0,
            borderColor: color,
            borderTopWidth: thickness,
            borderLeftWidth: thickness,
            borderTopLeftRadius: borderRadius
          }}></View>
        <View
          style={{
            position: 'absolute',
            height: borderLength,
            width: borderLength,
            top: 0,
            right: 0,
            borderColor: color,
            borderTopWidth: thickness,
            borderRightWidth: thickness,
            borderTopRightRadius: borderRadius
          }}></View>
        <View
          style={{
            position: 'absolute',
            height: borderLength,
            width: borderLength,
            bottom: 0,
            left: 0,
            borderColor: color,
            borderBottomWidth: thickness,
            borderLeftWidth: thickness,
            borderBottomLeftRadius: borderRadius
          }}></View>
        <View
          style={{
            position: 'absolute',
            height: borderLength,
            width: borderLength,
            bottom: 0,
            right: 0,
            borderColor: color,
            borderBottomWidth: thickness,
            borderRightWidth: thickness,
            borderBottomRightRadius: borderRadius
          }}></View>
      </View>
    );
  };
  return {onSuccess, flash, setFlash, marker};
};

export {qrScanHook};
