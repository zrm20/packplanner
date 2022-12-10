import { useSelector } from "react-redux";

export default function usePacks() {
  const packsSlice = useSelector(state => state.packs);

  if (!packsSlice) {
    throw new Error('usePacks must be used within a Redux Provider with a packsReducer in store');
  };

  return packsSlice.packs;
};