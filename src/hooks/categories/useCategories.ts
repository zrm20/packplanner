import { useSelector, useDispatch } from "../../redux/reduxHooks";
import { confirmDelete } from "../../utils";
import {
  addCategory as addCategoryAction,
  removeCategory as removeCategoryAction,
  updateCategory as updateCategoryAction
} from "../../redux/categoriesSlice";
import { updateItemsCategory } from "../../redux/inventorySlice";

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
        confirmDelete(
          () => {
            dispatch(updateItemsCategory({ categoryId: category.id }))
            dispatch(removeCategoryAction({ id: category.id }));
          },
          `Do you want to permanently delete the "${category.label}" category? All items in this category will be reset to Misc`,
          callback
        );
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