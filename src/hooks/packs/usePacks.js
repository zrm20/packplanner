import { Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useSelector, useDispatch } from "react-redux";
import { toggleSelectedPack, deletePack } from "../../redux/packsSlice";

export default function usePacks() {
  const packsSlice = useSelector(state => state.packs);
  const dispatch = useDispatch();
  const { navigate } = useNavigation();

  if (!packsSlice) {
    throw new Error('usePacks must be used within a Redux Provider with a packsReducer in store');
  };

  const packs = packsSlice.packs.map(pack => (
    {
      ...pack,
      isSelected: pack.id === packsSlice.selectedPack,
      select() {
        dispatch(toggleSelectedPack({ id: pack.id }));
      },
      delete() {
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
              onPress: dispatch(deletePack(pack)),
              style: 'destructive' // iOS only
            }
          ]
        );
      },
      update() {
        console.log("TODO ADD UPDATE");
      },
      openEdit() {
        navigate("EditPack", { pack })
      }
    }
  ));

  const selectedPackIndex = packs.findIndex(pack => pack.id === packsSlice.selectedPack);
  const selectedPack = selectedPackIndex === -1 ? null : packs[selectedPackIndex];

  return { ...packsSlice, packs, selectedPack };
};