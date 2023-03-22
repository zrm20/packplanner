import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "../../redux/reduxHooks";
import useCategories from "../categories/useCategories";
import useSettings from "../settings/useSettings";
import { confirmDelete } from "../../utils";
import {
  setItemQty,
  toggleIsPacked as toggleIsPackedAction,
  addToPack as addToPackAction
} from "../../redux/myPackSlice";

/*
  This hook returns a function used to construct a complex Item object
  from ItemData stored in redux (which is only serializable data). The
  function returns an Item object that is complete with methods and 
  properties attached to it.
*/

export default function useConstructItem() {
  const dispatch = useDispatch();
  const myPackItems = useSelector(state => state.myPack.itemsInPack);
  const { getCategoryById, miscCategory, categories } = useCategories();
  const { navigate } = useNavigation();
  const { weightUnit, liquidUnit } = useSettings();

  function constructItem(item: ItemData): Item {
    const packedItem = myPackItems.find(packedItem => packedItem.id === item.id);
    return {
      // item properties
      ...item,
      qty: packedItem?.qty || 0,
      isPacked: packedItem?.isPacked || false,


      // base fields is used for distributing only the original fields
      baseFields: {
        ...item
      },

      // populate the category field
      category: getCategoryById(item.category) || miscCategory, // defaults back to Misc category if no category found

      // item methods
      openEdit() {
        navigate('Locker', { screen: 'EditItem', params: { item: item.id } })
      },
      update(newValues, callback) {
        () => { };
        if (callback) {
          callback();
        };
      },
      delete(callback) {
        confirmDelete(
          () => { },
          `Do you want to permanently delete ${item.brand ? item.brand + ' ' : null}${item.name}?`,
          callback
        );
      },
      addToPack() {
        dispatch(addToPackAction({ itemId: item.id }))
      },
      setQty(newQty: number) {
        dispatch(setItemQty({ itemId: item.id, qty: newQty }))
      },
      getWeight() {
        const convertedWeight = weightUnit.convert(item.weight);
        return `${convertedWeight} ${weightUnit.label}`;
      },
      getLiquidCapacity() {
        if (!item.liquidCapacity) {
          return '';
        };
        const convertedCapacity = liquidUnit.convert(item.liquidCapacity);
        return `${convertedCapacity} ${liquidUnit.label}`;
      },
      toggleIsPacked() {
        dispatch(toggleIsPackedAction({ itemId: item.id }));
      }
    }
  };

  return constructItem;
};