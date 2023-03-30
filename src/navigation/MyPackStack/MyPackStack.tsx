import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { LoadListScreen } from '../../components/lists';
import { ChartScreen, ChecklistScreen, MyPackScreen } from '../../components/myPack';
import { MyPackStackParamList } from '../navigation.types';

const Stack = createNativeStackNavigator<MyPackStackParamList>();

export default function MyPackStack(): JSX.Element {
  return (
    <Stack.Navigator
      id="MyPackStack"
      initialRouteName="MyPackHome"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="MyPackHome" component={MyPackScreen} />

      <Stack.Group
        screenOptions={{
          presentation: 'containedModal',
        }}>
        <Stack.Screen name="Checklist" component={ChecklistScreen} />
        <Stack.Screen name="Chart" component={ChartScreen} />
        <Stack.Screen name="Lists" component={LoadListScreen} />
      </Stack.Group>
    </Stack.Navigator>
  );
}
