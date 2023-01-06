import { createNativeStackNavigator, NativeStackScreenProps } from '@react-navigation/native-stack';

import { InventoryScreen, NewItemScreen, EditItemScreen } from '../../components/inventory';
import { NewPackScreen, EditPackScreen } from '../../components/packs';
import { Item } from '../../redux/inventorySlice';
import { Pack } from '../../redux/packsSlice';

type PackId = string;
type ItemId = string;
export type LockerStackParamList = {
  Locker: undefined;
  NewPack: undefined;
  EditPack: { pack: Pack | PackId };
  NewItem: undefined;
  EditItem: { item: Item | ItemId };
};
type EditPackProps = NativeStackScreenProps<LockerStackParamList, 'EditPack', 'Locker'>

const Stack = createNativeStackNavigator<LockerStackParamList>();

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
        <Stack.Screen name="EditPack" component={EditPackScreen} />
        <Stack.Screen name="NewItem" component={NewItemScreen} />
        <Stack.Screen name="EditItem" component={EditItemScreen} />
      </Stack.Group>
    </Stack.Navigator>
  );
};