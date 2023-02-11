import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { ChecklistScreen, MyPackScreen } from "../../components/myPack";
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

      <Stack.Group
        screenOptions={{
          presentation: "modal"
        }}
      >
        <Stack.Screen name="Checklist" component={ChecklistScreen} />
      </Stack.Group>

    </Stack.Navigator>
  )
};