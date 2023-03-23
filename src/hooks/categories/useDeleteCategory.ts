import { collection, doc, writeBatch } from "firebase/firestore";
import { db } from "../../config/firebase";
import { useSelector } from "../../redux/reduxHooks";
import { confirmDelete } from "../../utils";

export default function useDeleteCategory(id: string) {
  const itemsWithCategory = useSelector(state => {
    return state.inventory.inventory.filter(item => item.category === id);
  });
  const itemCollection = collection(db, "items");
  const categoriesCollection = collection(db, "categories");

  const batch = writeBatch(db);
  const itemRefs = itemsWithCategory.map(item => doc(itemCollection, item.id));
  const categoryRef = doc(categoriesCollection, id);

  async function deleteCategory(): Promise<void> {
    itemRefs.forEach(itemRef => batch.update(itemRef, { category: "00" }));

    batch.delete(categoryRef);

    try {
      await batch.commit();
    } catch (err) {
      console.log(err); // TODO Better error handling
    };
  };

  return deleteCategory;
}