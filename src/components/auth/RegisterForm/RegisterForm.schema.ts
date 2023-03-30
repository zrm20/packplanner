import * as Yup from 'yup';

const registerFormSchema = Yup.object({
  email: Yup.string().email('Must be a valid email address').required('Email is required'),
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .matches(/.*[A-Z]/, 'Must contain at least one uppercase letter')
    .matches(/.*[a-z]/, 'Must contain at least one lowercase letter')
    .matches(/.*[0-9]/, 'Must contain at least one number')
    .required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords must match')
    .required('Password is required'),
});

export default registerFormSchema;
