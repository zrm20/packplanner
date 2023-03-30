import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';

import useStyles from './NewCategoryScreen.styles';
import { useCategories } from '../../../hooks';
import useThrowAlert from '../../../hooks/alerts/useThrowAlert';
import { CategoriesStackParamList } from '../../../navigation/navigation.types';
import { ContainedModalTitle, SafeAreaScreen } from '../../ui';
import CategoryForm from '../CategoryForm/CategoryForm';

type NewCategoryScreenProps = NativeStackScreenProps<CategoriesStackParamList, 'NewCategory'>;

export default function NewCategoryScreen(props: NewCategoryScreenProps): JSX.Element {
  const styles = useStyles();
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
    <SafeAreaScreen style={styles.container}>
      <ContainedModalTitle title="New Custom Category" />
      <CategoryForm onSubmit={handleSubmit} />
    </SafeAreaScreen>
  );
}
