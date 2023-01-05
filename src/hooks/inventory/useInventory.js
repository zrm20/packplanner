import { useNavigation } from "@react-navigation/native";
import { useSelector, useDispatch } from "react-redux";

import {
  addItem as addAction,
  deleteItem as deleteAction,
  updateItem as updateAction,
  toggleInPack as toggleAction
}
  from "../../redux/inventorySlice";
import { extractId } from "../../utils";

export default function useInventory() {
  const inventorySlice = useSelector(state => state.inventory);
  const dispatch = useDispatch();
  const { navigate } = useNavigation();

  if (!inventorySlice) {
    throw new Error("useInventory must be used within a Redux Provider that contains an inventory reducer");
  };

  const inventory = inventorySlice.inventory.map(item => (
    {
      // item properties
      ...item,

      // base fields is used for distributing only the original fields
      baseFields: {
        ...item
      },

      // item methods
      toggleInPack() {
        dispatch(toggleAction({ id: item.id }));
      },
      openEdit() {
        navigate("EditItem", { item })
      },
      update(newValues, callback) {
        dispatch(updateAction({ newValues, id: item.id }));
        if (callback) {
          callback();
        };
      }
    }
  ));

  const itemsInPack = inventory.filter(item => item.inPack);
  const waterContainersInPack = inventory.filter(item => item.inPack && item.liquidCapacity > 0);

  function getItemById(id) {
    return inventory.find(item => item.id === id);
  };

  function addToInventory(newItem) {
    dispatch(addItem({ item: newItem }));
  };

  function deleteFromInventory(itemOrId) {
    const id = extractId(itemOrId);
    dispatch(removeItem(removeItem({ id })));
  };

  function updateItem(oldItemOrId, newItem) {
    const id = extractId(oldItemOrId);
    dispatch(updateAction({ id, newItem }));
  };

  function filterByCategory(category, arrayOfItems) {
    const items = arrayOfItems || inventory;

    if (typeof items !== 'array') {
      throw new Error("Invalid argument. filterByCategory requires array of items to filter")
    };

    return items.filter(item => item.category === category);
  };

  return {
    inventorySlice,
    inventory,
    itemsInPack,
    waterContainersInPack,
    getItemById,
    addToInventory,
    deleteFromInventory,
    updateItem,
    filterByCategory
  };
};