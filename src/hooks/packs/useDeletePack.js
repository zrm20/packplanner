import { useNavigation } from "@react-navigation/native";
import { Alert } from "react-native";
import { useDispatch } from "react-redux";

import { deletePack as deletePackAction } from "../../redux/packsSlice";

export default function useDeletePack() {
  const dispatch = useDispatch();
  const { navigate } = useNavigation();

  function handleDelete(pack) {
    dispatch(deletePackAction({ pack }));
    navigate('Inventory', { screen: 'Locker' });
  };

  function deletePack(pack) {
    if (!pack) {
      throw new Error('deletePack() recieved no pack argument')
    };

    Alert.alert(
      "Are you sure?", // Alert title
      `Do you want to perminantly delete ${pack.brand} ${pack.model}?`, // Alert message
      [
        {
          // first button option
          text: "Cancel",
          onPress: () => null,
          style: 'cancel' // iOS only
        },
        {
          // second button option
          text: "Delete pack",
          onPress: () => handleDelete(pack),
          style: 'destructive' // iOS only
        }
      ]
    );
  };

  return deletePack;
}