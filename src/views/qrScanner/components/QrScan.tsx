import {useNavigation} from '@react-navigation/native';
import {actualTheme} from '@src/types/contextTypes';
import {StackNavigation} from '@src/types/globalTypes';
import {qrScanStyles} from '@src/views/qrScanner/styles/qrscanStyles';
import {t} from 'i18next';
import {View, useWindowDimensions} from 'react-native';
import {RNCamera} from 'react-native-camera';
import {IconButton, Text} from 'react-native-paper';
import QRCodeScanner from 'react-native-qrcode-scanner';
import {qrScanHook} from '../../login/hooks/qrScanHook';

const QrScan = () => {
  const {colors, dark} = actualTheme();
  const {goBack} = useNavigation<StackNavigation>();
  const {height} = useWindowDimensions();
  const {onSuccess, flash, setFlash, marker} = qrScanHook();

  return (
    <QRCodeScanner
      onRead={onSuccess}
      flashMode={flash}
      showMarker
      reactivate
      fadeIn={false}
      customMarker={marker('white', 250, '25%', 6, 20)}
      topContent={
        <Text
          style={[
            qrScanStyles.centerText,
            {
              color: colors.onSurface
            }
          ]}>
          {t('qrScan.title')}
        </Text>
      }
      bottomContent={
        <View style={qrScanStyles.buttonContainer}>
          <View style={qrScanStyles.buttonContent}>
            <IconButton
              style={{
                backgroundColor: colors.onSurfaceDisabled
              }}
              mode="contained-tonal"
              iconColor={dark ? colors.onSurface : colors.onPrimaryContainer}
              icon="location-exit"
              onPress={() => goBack()}
            />
            <IconButton
              style={{
                backgroundColor: colors.onSurfaceDisabled
              }}
              mode="contained-tonal"
              iconColor={dark ? colors.onSurface : colors.onPrimaryContainer}
              icon="flashlight"
              onPress={() => setFlash(RNCamera.Constants.FlashMode.torch)}
            />
            <IconButton
              style={{
                backgroundColor: colors.onSurfaceDisabled
              }}
              mode="contained-tonal"
              iconColor={dark ? colors.onSurface : colors.onPrimaryContainer}
              icon="flashlight-off"
              onPress={() => setFlash(RNCamera.Constants.FlashMode.off)}
            />
          </View>
        </View>
      }
      // cameraProps={{autoFocus: 'on', videoStabilizationMode: 'auto'}}
      cameraStyle={{
        height: height * 0.7
      }}
    />
  );
};

export default QrScan;
