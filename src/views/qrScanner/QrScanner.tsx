import {View, Text, SafeAreaView} from 'react-native';
import QrScan from '../login/components/QrScan';
import {backgroundStyle} from '@src/globals/styles/screenMode';

const QrScanner = () => {
  return (
    <SafeAreaView style={backgroundStyle}>
      <QrScan />
    </SafeAreaView>
  );
};

export default QrScanner;
