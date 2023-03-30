import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { RegisterGuestScreen } from '../../components/auth';
import { SettingsScreen } from '../../components/settings';
import { SettingsStackParamList } from '../navigation.types';

const Stack = createNativeStackNavigator<SettingsStackParamList>();

export default function SettingsStack(): JSX.Element {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="SettingsHome" component={SettingsScreen} />

      <Stack.Group
        screenOptions={{
          presentation: 'modal',
        }}>
        <Stack.Screen name="RegisterGuest" component={RegisterGuestScreen} />
      </Stack.Group>
    </Stack.Navigator>
  );
}
