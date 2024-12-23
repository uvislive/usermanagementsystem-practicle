import { FormikHelpers, useFormik,ErrorMessage } from "formik";

export const useForm = (initialValues, onSubmit, validationSchema) => {
  return useFormik({
    initialValues,
    validationSchema,
    validateOnChange: true,
    enableReinitialize: true,
    validateOnBlur: true,
    onSubmit,
    ErrorMessage
  });
};
