import {Text, View} from 'react-native';
import {loginFormStyles} from '../../views/login/styles/loginFormStyles';

const ErrorInputForm = ({error}: {error: string}) => {
  return (
    <View style={loginFormStyles.errorContainer}>
      <Text style={loginFormStyles.error}>{error!}</Text>
    </View>
  );
};

export default ErrorInputForm;
