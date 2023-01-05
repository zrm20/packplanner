import { Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useSelector, useDispatch } from "react-redux";

import {
  toggleSelectedPack,
  deletePack as deleteAction,
  updatePack as updateAction,
  addPack as addAction
} from "../../redux/packsSlice";

import { extractId } from "../../utils";

function confirmDelete(deleteFn, pack, callback) {
  Alert.alert(
    "Are you sure?", // Alert title
    `Do you want to perminantly delete ${pack ? pack.brand + ' ' + pack.model : 'this pack'}?`, // Alert message
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
        onPress: () => {
          deleteFn();
          if (callback) {
            callback();
          };
        },
        style: 'destructive' // iOS only
      }
    ]
  );
};

export default function usePacks() {
  const packsSlice = useSelector(state => state.packs);
  const dispatch = useDispatch();
  const { navigate } = useNavigation();

  if (!packsSlice) {
    throw new Error('usePacks must be used within a Redux Provider with a packsReducer in store');
  };

  const packs = packsSlice.packs.map(pack => (
    {
      // pack properties
      ...pack,
      isSelected: pack.id === packsSlice.selectedPack,
      // base fields is used for distributing only the original field values from store
      baseFields: {
        ...pack
      },

      // pack methods
      select() {
        dispatch(toggleSelectedPack({ id: pack.id }));
      },
      openEdit() {
        navigate("EditPack", { pack })
      },
      delete(callback) {
        confirmDelete(
          () => dispatch(deleteAction({ id: pack.id })),
          pack,
          callback
        );
      },
      update(newValues, callback) {
        dispatch(updateAction({ id: pack.id, newValues }));
        if (callback) {
          callback();
        }
      }
    }
  ));

  const selectedPack = packs.find(pack => pack.id === packsSlice.selectedPack);

  function getPackById(id) {
    return packs.find(pack => pack.id === id);
  };

  function addPack(pack) {
    dispatch(addAction({ pack }));
  };

  return { packsSlice, packs, selectedPack, getPackById, addPack };
};