import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { CategoriesStackParamList } from "../navigation.types";
import { CategoriesScreen, NewCategoryScreen } from "../../components/categories";

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

      <Stack.Group
        screenOptions={
          {
            presentation: "modal"
          }
        }
      >
        <Stack.Screen name="NewCategory" component={NewCategoryScreen} />
      </Stack.Group>
    </Stack.Navigator>
  )
};