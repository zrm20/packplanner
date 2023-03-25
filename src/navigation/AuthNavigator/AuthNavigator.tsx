import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { LoginScreen, RegisterScreen, SplashScreen } from "../../components/auth";
import { AuthStackParamList } from "../navigation.types";

const Stack = createNativeStackNavigator<AuthStackParamList>();

export default function AuthNavigator(): JSX.Element {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false
      }}
    >
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Group>
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
      </Stack.Group>
    </Stack.Navigator>
  )
};