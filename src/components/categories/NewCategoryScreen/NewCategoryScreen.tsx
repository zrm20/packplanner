import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';

import { useCategories } from '../../../hooks';
import useThrowAlert from '../../../hooks/alerts/useThrowAlert';
import { CategoriesStackParamList } from '../../../navigation/navigation.types';
import FieldGuideFormScreen from '../../ui/FieldGuideFormScreen';
import CategoryForm from '../CategoryForm/CategoryForm';

type NewCategoryScreenProps = NativeStackScreenProps<CategoriesStackParamList, 'NewCategory'>;

export default function NewCategoryScreen(props: NewCategoryScreenProps): JSX.Element {
  const { navigation } = props;
  const { createNewCategory } = useCategories();
  const { catchUnknownError } = useThrowAlert();

  async function handleSubmit(values: CategoryFormData): Promise<void> {
    try {
      await createNewCategory(values);
      navigation.goBack();
    } catch (err) {
      catchUnknownError(err, 'Failed to add category. Please try again');
    }
  }

  return (
    <FieldGuideFormScreen title="Add category" eyebrow="Categories / Field guide">
      <CategoryForm onSubmit={handleSubmit} />
    </FieldGuideFormScreen>
  );
}
