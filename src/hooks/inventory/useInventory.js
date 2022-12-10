import { useSelector } from "react-redux";

export default function useInventory() {
  const inventorySlice = useSelector(state => state.inventory);

  if (!inventorySlice) {
    throw new Error("useInventory must be used within a Redux Provider that contains an inventory reducer");
  };

  return inventorySlice.inventory;
}