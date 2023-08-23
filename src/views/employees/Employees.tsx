import {EmployeesProps} from '@src/types/globalTypes';
import {SafeAreaView, Text} from 'react-native';

const Employees = ({navigation, route}: EmployeesProps) => {
  return (
    <SafeAreaView>
      <Text>Employees</Text>
    </SafeAreaView>
  );
};

export default Employees;
