import {actualTheme} from '@src/types/contextTypes';
import {View} from 'react-native';
import {Text} from 'react-native-paper';
import {Callout} from 'react-native-maps';

const CalloutBadge = ({title, body}: {title: string; body: string}) => {
  const {dark, colors} = actualTheme();
  const textColor = dark ? colors.background : colors.onSurface;
  return (
    <Callout>
      <View>
        <Text style={{fontWeight: 'bold', color: textColor}}>{title}</Text>
        <Text style={{color: textColor}}>{body}</Text>
      </View>
    </Callout>
  );
};

export default CalloutBadge;
