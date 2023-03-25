import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { CategoriesStackParamList } from "../navigation.types";
import { CategoriesScreen, EditCategoryScreen, NewCategoryScreen } from "../../components/categories";

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
            presentation: "containedModal"
          }
        }
      >
        <Stack.Screen name="NewCategory" component={NewCategoryScreen} />
        <Stack.Screen name="EditCategory" component={EditCategoryScreen} />
      </Stack.Group>
    </Stack.Navigator>
  )
};