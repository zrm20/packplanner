import { useSelector, useDispatch } from "../../redux/reduxHooks";

export default function useCategories() {
  const categoriesSlice = useSelector(state => state.categories);

  function getCategoryById(id: string): CategoryData | null {
    return categoriesSlice.categories.find(category => category.id === id) || null;
  };

  return {
    categoriesSlice,
    getCategoryById
  };
};