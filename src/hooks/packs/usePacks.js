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
        // dispatch(toggleSelectedPack({ id: pack.id }));
      },
      openEdit() {
        navigate("EditPack", { pack })
      }
    }
  ));

  const selectedPack = packs.find(pack => pack.id === packsSlice.selectedPack);

  function getPackById(id) {
    return packs.find(pack => pack.id === id);
  };

  return { packsSlice, packs, selectedPack, getPackById };
};