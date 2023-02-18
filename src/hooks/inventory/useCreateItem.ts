import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "../../redux/reduxHooks";
import useCategories from "../categories/useCategories";
import {
  toggleInPack as toggleAction,
  updateItem as updateAction,
  deleteItem as deleteAction,
  updateQty as updateQtyAction,
  toggleIsPacked as toggleIsPackedAction
} from '../../redux/inventorySlice';
import useSettings from "../settings/useSettings";
import { confirmDelete } from "../../utils";

/*
  This hook returns a function used to construct a complex Item object
  from ItemData stored in redux (which is only serializable data). The
  function returns an Item object that is complete with meathods and 
  properties attatched to it.
*/

export default function useCreateItem() {
  const dispatch = useDispatch();
  const { getCategoryById, miscCategory } = useCategories();
  const { navigate } = useNavigation();
  const { weightUnit, liquidUnit } = useSettings();

  function createItem(item: ItemData): Item {
    return {
      // item properties
      ...item,

      // base fields is used for distributing only the original fields
      baseFields: {
        ...item
      },

      // populate the category field
      category: getCategoryById(item.category) || miscCategory, // defaults back to Misc category if no category found

      // item methods
      toggleInPack() {
        dispatch(toggleAction({ id: item.id }));
      },
      openEdit() {
        navigate('Locker', { screen: 'EditItem', params: { item: item.id } })
      },
      update(newValues, callback) {
        dispatch(updateAction({ newValues, id: item.id }));
        if (callback) {
          callback();
        };
      },
      delete(callback) {
        confirmDelete(
          () => dispatch(deleteAction({ id: item.id })),
          `Do you want to perminantly delete ${item.brand ? item.brand + ' ' : null}${item.name}?`,
          callback
        );
      },
      updateQty(newQty: number) {
        dispatch(updateQtyAction({ id: item.id, newQty }))
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
        dispatch(toggleIsPackedAction({ id: item.id }));
      }
    }
  };

  return createItem;
};