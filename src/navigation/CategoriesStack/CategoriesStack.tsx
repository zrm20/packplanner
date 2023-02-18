import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { CategoriesStackParamList } from "../navigation.types";
import { CategoriesScreen } from "../../components/categories";

const Stack = createNativeStackNavigator<CategoriesStackParamList>();

export default function CategoriesStack(): JSX.Element {
  return (
    <Stack.Navigator
      id="CategoriesStack"
      initialRouteName="CategoriesHome"
      screenOptions={{
        headerShown: false
      }}
    >
      <Stack.Screen name="CategoriesHome" component={CategoriesScreen} />
    </Stack.Navigator>
  )
};