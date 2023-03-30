import * as Yup from 'yup';

const packFormSchema = Yup.object({
  brand: Yup.string().required('Brand is required').min(1, 'Must be at least 1 character'),
  model: Yup.string().required('Model is required').min(1, 'Must be at least 1 character'),
  capacity: Yup.number()
    .transform((val) => (isNaN(val) ? 0 : Number(val)))
    .required('Capacity (in Liters) is required'),
  weight: Yup.number().required('Weight is required').min(0.1, 'Weight must be a positive number'),
});

export default packFormSchema;
