import * as yup from "yup";

export const registerSchema = yup.object().shape({
  username: yup.string().required("Name is required").min(2, "Name is too short"),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().min(6, "Password must be at least 6 characters").required("Required"),
});

export const loginSchema = yup.object().shape({
  email: yup.string().email("Invalid email format").required("Email is required"),
  password: yup.string().min(6, "Password must be at least 6 characters").required("Required"),
});

export const appointmentSchema = yup.object().shape({
  name: yup.string().required('Name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  phone: yup.string().required('Phone number is required'),
  time: yup.string().required('Time is required'),
  comment: yup.string().required('Comment is required'),
});