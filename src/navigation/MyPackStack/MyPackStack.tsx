import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { MyPackScreen } from "../../components/myPack";
import { MyPackStackParamList } from "../navigation.types";

const Stack = createNativeStackNavigator<MyPackStackParamList>();

export default function MyPackStack(): JSX.Element {
  return (
    <Stack.Navigator 
      id="MyPackStack" 
      initialRouteName="MyPackHome"
      screenOptions={{
        headerShown: false
      }}
    >
      <Stack.Screen name="MyPackHome" component={MyPackScreen} />
    </Stack.Navigator>
  )
};