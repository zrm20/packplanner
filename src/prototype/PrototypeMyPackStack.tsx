/**
 * DISPOSABLE: My Pack stack with PrototypeChartScreen for seeded liquid level.
 */
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { LoadListScreen } from '../components/lists';
import { ChecklistScreen, MyPackScreen } from '../components/myPack';
import { MyPackStackParamList } from '../navigation/navigation.types';
import PrototypeChartScreen from './PrototypeChartScreen';

const Stack = createNativeStackNavigator<MyPackStackParamList>();

export default function PrototypeMyPackStack(): JSX.Element {
  return (
    <Stack.Navigator
      id="PrototypeMyPackStack"
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
        <Stack.Screen name="Chart" component={PrototypeChartScreen} />
        <Stack.Screen name="Lists" component={LoadListScreen} />
      </Stack.Group>
    </Stack.Navigator>
  );
}
