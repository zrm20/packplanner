import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { LoginScreen, RegisterScreen, SettingsScreen } from "../../components/settings";
import { SettingsStackParamList } from "../navigation.types";

const Stack = createNativeStackNavigator<SettingsStackParamList>();

export default function SettingsStack(): JSX.Element {
  return (
    <Stack.Navigator
      screenOptions={
        {
          headerShown: false
        }
      }
    >
      <Stack.Screen name="SettingsHome" component={SettingsScreen} />

      <Stack.Group
        screenOptions={
          {
            presentation: "modal"
          }
        }
      >
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
      </Stack.Group>
    </Stack.Navigator>
  )
}