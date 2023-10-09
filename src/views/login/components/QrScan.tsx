import QRCodeScanner from 'react-native-qrcode-scanner';
import {RNCamera} from 'react-native-camera';
import {Linking, StyleSheet, TouchableOpacity} from 'react-native';
import {Text} from 'react-native-paper';

const QrScan = () => {
  const onSuccess = (e: {data: string}) => {
    console.log('eee', e);

    Linking.openURL(e.data).catch(err =>
      console.error('An error occured', err)
    );
  };

  return (
    <QRCodeScanner
      onRead={onSuccess}
      flashMode={RNCamera.Constants.FlashMode.torch}
      topContent={<Text style={styles.centerText}>Go to pppppppp</Text>}
      bottomContent={
        <TouchableOpacity style={styles.buttonTouchable}>
          <Text style={styles.buttonText}>OK. Got it!</Text>
        </TouchableOpacity>
      }
      cameraStyle={{
        height: 500
      }}
    />
  );
};

export default QrScan;

const styles = StyleSheet.create({
  centerText: {
    flex: 1,
    fontSize: 18,
    padding: 90,
    color: '#000'
  },
  textBold: {
    fontWeight: '500',
    color: '#000'
  },
  buttonText: {
    fontSize: 21,
    color: '#000'
  },
  buttonTouchable: {
    padding: 16
  }
});
