import {backgroundStyle} from '@src/globals/styles/screenMode';
import {SafeAreaView, View} from 'react-native';
import QrScan from './components/QrScan';
import {qrScanStyles} from './styles/qrscanStyles';

const QrScanner = () => {
  return (
    <SafeAreaView style={backgroundStyle}>
      <View style={qrScanStyles.viewContainer}>
        <QrScan />
      </View>
    </SafeAreaView>
  );
};

export default QrScanner;
