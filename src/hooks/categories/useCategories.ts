import { useSelector, useDispatch } from "../../redux/reduxHooks";
import { confirmDelete } from "../../utils";
import {
  addCategory as addCategoryAction,
  removeCategory as removeCategoryAction,
  updateCategory as updateCategoryAction
} from "../../redux/categoriesSlice";

interface CategoryHook {
  categoriesSlice: CategorySliceState;
  categories: Category[];
  miscCategory: Category;
  getCategoryById(id: string): Category | null;
  createNewCategory(newCategory: CategoryFormData, callback?: Function): void;
};

export default function useCategories(): CategoryHook {
  const categoriesSlice = useSelector(state => state.categories);
  const dispatch = useDispatch();

  function createCategory(category: CategoryData): Category {
    return {
      ...category,

      // original base fields
      baseFields: {
        ...category
      },

      update(newValues, callback?) {
        dispatch(updateCategoryAction({ newValues, id: category.id }))

        if (callback) {
          callback();
        };
      },
      delete(callback?) {
        dispatch(removeCategoryAction({ id: category.id }));

        if (callback) {
          callback();
        };
      }
    }
  };

  const categories = categoriesSlice.categories.map(createCategory);
  const miscCategory = categories.find(category => category.id === '00')!

  function getCategoryById(id: string): Category | null {
    return categories.find(category => category.id === id) || null;
  };

  function createNewCategory(newCategory: CategoryFormData, callback?: Function): void {
    dispatch(addCategoryAction({ newCategory }));

    if (callback) {
      callback();
    };
  };

  return {
    categories,
    miscCategory,
    categoriesSlice,
    getCategoryById,
    createNewCategory,
  };
};