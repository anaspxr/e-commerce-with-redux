import * as yup from "yup";

export const signUpSchema = yup.object().shape({
  name: yup.string().required("Required"),
  email: yup
    .string()
    .email("Please enter a valid email..")
    .required("Required"),
  password: yup
    .string()
    .min(6, "Minimum 6 characters")
    .max(16, "Maximum 16 characters")
    .required("Required"),
  confirm: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Required"),
});

export const addressSchema = yup.object().shape({
  name: yup.string().required("Required"),
  address: yup.string().required("Required"),
  city: yup.string().required("Required"),
  state: yup.string().required("Required"),
  pincode: yup.string().length(6, "Enter a valid pin").required("Required"),
  phone: yup
    .string()
    .min(7, "Enter a valid Phone Number.")
    .required("Required"),
});

export const productSchema = yup.object().shape({
  name: yup.string().required("Required"),
  category: yup.string().required("Required"),
  discountPrice: yup.number().required("Required"),
  oldPrice: yup.number().required("Required"),
  description: yup.string().required("Required"),
  image: yup.string().required("Required"),
});
