import { useSelector, useDispatch } from "react-redux";
import { addItem, removeItem, updateItem as updateAction, toggleInPack as toggleAction } from "../../redux/inventorySlice";

import { extractId } from "../../utils";

export default function useInventory() {
  const inventorySlice = useSelector(state => state.inventory);
  const dispatch = useDispatch()

  if (!inventorySlice) {
    throw new Error("useInventory must be used within a Redux Provider that contains an inventory reducer");
  };

  const inventory = inventorySlice.inventory.map(item => (
    {
      ...item,
      toggleInPack() {
        dispatch(toggleAction({ id: item.id }));
      },
      openEdit() {

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