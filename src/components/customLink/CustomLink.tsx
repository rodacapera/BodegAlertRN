import {CustomLinkProps} from '@src/types/globalTypes';
import {Linking, TouchableOpacity} from 'react-native';
import {Text} from 'react-native-paper';

function CustomLink({text, link, underline, color = 'blue'}: CustomLinkProps) {
  return (
    <TouchableOpacity onPress={() => Linking.openURL(link)}>
      <Text
        style={{
          color: color,
          textDecorationLine: underline ? 'underline' : 'none',
        }}>
        {text}
      </Text>
    </TouchableOpacity>
  );
}

export default CustomLink;
