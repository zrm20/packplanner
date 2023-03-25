import { useSelector, useDispatch } from "../../redux/reduxHooks";
import { confirmDelete } from "../../utils";
import { addDoc, collection, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "../../config/firebase";

interface CategoryHook {
  categoriesSlice: CategorySliceState;
  categories: Category[];
  miscCategory: Category;
  getCategoryById(id: string): Category | null;
  createNewCategory(newCategory: CategoryFormData, callback?: Function): void;
};

export default function useCategories(): CategoryHook {
  const categoriesSlice = useSelector(state => state.categories);
  const user = useSelector(state => state.user.user);
  const dispatch = useDispatch();

  const categoriesCollection = collection(db, "categories");

  function createCategory(category: CategoryData): Category {
    const docRef = doc(db, "categories", category.id);

    return {
      ...category,

      // original base fields
      baseFields: {
        ...category
      },

      async update(newValues) {
        await updateDoc(docRef, { ...newValues });
      }
    }
  };

  const categories = categoriesSlice.categories.map(createCategory);
  const miscCategory = categories.find(category => category.id === '00')!

  function getCategoryById(id: string): Category | null {
    return categories.find(category => category.id === id) || null;
  };

  async function createNewCategory(newCategory: CategoryFormData): Promise<void> {
    const newDoc: CategoryDocument = {
      ...newCategory,
      uid: user!.uid
    }

    await addDoc(categoriesCollection, newDoc);
  };

  return {
    categories,
    miscCategory,
    categoriesSlice,
    getCategoryById,
    createNewCategory,
  };
};