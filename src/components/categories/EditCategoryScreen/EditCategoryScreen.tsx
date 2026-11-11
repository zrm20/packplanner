import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { View } from 'react-native';
import { Button, Text } from 'react-native-paper';

import { useCategories, useDeleteCategory } from '../../../hooks';
import useThrowAlert from '../../../hooks/alerts/useThrowAlert';
import { CategoriesStackParamList } from '../../../navigation/navigation.types';
import { SafeAreaScreen } from '../../ui';
import FieldGuideFormScreen from '../../ui/FieldGuideFormScreen';
import CategoryForm from '../CategoryForm/CategoryForm';

type EditCategoryScreenProps = NativeStackScreenProps<CategoriesStackParamList, 'EditCategory'>;

export default function EditCategoryScreen(props: EditCategoryScreenProps): JSX.Element {
  const { categoryId } = props.route.params;
  const { goBack } = props.navigation;
  const { getCategoryById } = useCategories();
  const deleteCategory = useDeleteCategory(categoryId);
  const { catchUnknownError } = useThrowAlert();

  const category = getCategoryById(categoryId);

  if (!category) {
    return (
      <SafeAreaScreen>
        <View>
          <Text>Could not find a category with that id</Text>
          <Button onPress={goBack} mode="contained">
            Go Back
          </Button>
        </View>
      </SafeAreaScreen>
    );
  }

  async function handleSubmit(newValues: CategoryFormData): Promise<void> {
    try {
      await category?.update(newValues);
      goBack();
    } catch (err) {
      catchUnknownError(err, 'Failed to update category. Please try again.');
    }
  }

  async function handleDelete(): Promise<void> {
    try {
      await deleteCategory();
      props.navigation.navigate('CategoriesHome');
    } catch (err) {
      catchUnknownError(err, 'Failed to delete category. Please try again.');
    }
  }

  return (
    <FieldGuideFormScreen title="Edit category" eyebrow="Categories / Field guide">
      <CategoryForm category={category} onSubmit={handleSubmit} onDelete={handleDelete} />
    </FieldGuideFormScreen>
  );
}
