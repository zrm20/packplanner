import React from "react";
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { useNavigation } from "@react-navigation/native";
import { IconButtonProps, IconButton } from "react-native-paper";
import { RootTabParamList } from "../../../navigation/navigation.types";



interface NavButtonProps extends IconButtonProps {
  icon: React.ComponentProps<typeof MaterialCommunityIcons>['name'];
  tab?: keyof RootTabParamList,
  params?: any // TODO Fix this
  goBack?: boolean
};

export default function NavIconButton(props: NavButtonProps): JSX.Element {
  const { tab, goBack = false, params, ...rest } = props;
  const navigation = useNavigation();

  function handlePress(): void {
    if(goBack) {
      navigation.goBack();
    }else {
      navigation.navigate(tab, params);
    };
  };
  
  return <IconButton onPress={handlePress} {...rest} />;
};
