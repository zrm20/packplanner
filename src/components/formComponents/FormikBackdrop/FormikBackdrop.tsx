import { useFormikContext } from 'formik';
import React from 'react';

import { LoadingBackdrop } from '../../ui';

export default function FormikBackdrop(): JSX.Element {
  const { isSubmitting } = useFormikContext();

  return <LoadingBackdrop show={isSubmitting} />;
}
