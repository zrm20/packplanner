import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { InventoryScreen, NewItemScreen } from '../../components/inventory';
import { NewPackScreen } from '../../components/packs';

const Stack = createNativeStackNavigator();

export default function LockerStack() {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Locker" component={InventoryScreen} />
      <Stack.Group
        screenOptions={{
          presentation: "modal"
        }}
      >
        <Stack.Screen name="NewPack" component={NewPackScreen} />
        <Stack.Screen name="NewItem" component={NewItemScreen} />
      </Stack.Group>
    </Stack.Navigator>
  );
};