import { useFormik } from "formik";
import { useEffect } from "react";
import { Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useLoadingContext } from "react-router-loading";
import * as yup from "yup";
import { useAuth } from "../../context/AuthContext";
import FormInputs from "./FormInputs";
import styles from "./styles/FormPage.module.css";

export default function SignUp() {
  const loadingContext = useLoadingContext();

  const navigate = useNavigate();

  const { signUp } = useAuth();

  const formik = useFormik({
    initialValues: {
      userName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: yup.object({
      userName: yup
        .string()
        .min(2, "Username is too short")
        .max(20, "Username is too long")
        .required("Username is required"),
      email: yup
        .string()
        .email("Provide a valid email")
        .required("email is required"),
      password: yup
        .string()
        .matches(
          /(?=.*[a-z])/,
          "The string must contain at least 1 lowercase alphabetical character"
        )
        .matches(
          /(?=.*[A-Z])/,
          "The string must contain at least 1 uppercase alphabetical character"
        )
        .matches(
          /(?=.*[0-9])/,
          "The string must contain at least 1 numeric character"
        )
        .matches(/(?=.{6,})/, "The string must be eight characters or longer")
        .required("password is required"),
      confirmPassword: yup
        .string()
        .oneOf([yup.ref("password")], "Password does not match")
        .required("confirmPassword is required"),
    }),
    onSubmit: async (values) => {
      signUp(values.userName, values.email, values.password);
    },
  });

  useEffect(() => {
    loadingContext.done();
  }, []);

  return (
    <Form className={styles.form} onSubmit={formik.handleSubmit}>
      <h2 className="my-4">Sign Up</h2>

      <FormInputs
        placeholder="name"
        type="text"
        name="userName"
        value={formik.values.userName}
        onChange={formik.handleChange}
        isInvalid={
          formik.errors.userName && formik.touched.userName ? true : false
        }
        feedback={
          formik.errors.userName && formik.touched.userName
            ? formik.errors.userName
            : null
        }
      />
      <FormInputs
        placeholder="email"
        name="email"
        type="email"
        value={formik.values.email}
        onChange={formik.handleChange}
        isInvalid={formik.errors.email && formik.touched.email ? true : false}
        feedback={
          formik.errors.email && formik.touched.email
            ? formik.errors.email
            : null
        }
      />
      <FormInputs
        placeholder="password"
        type="password"
        name="password"
        value={formik.values.password}
        onChange={formik.handleChange}
        isInvalid={
          formik.errors.password && formik.touched.password ? true : false
        }
        feedback={
          formik.errors.password && formik.touched.password
            ? formik.errors.password
            : null
        }
      />
      <FormInputs
        placeholder="confirm password"
        name="confirmPassword"
        type="password"
        value={formik.values.confirmPassword}
        onChange={formik.handleChange}
        isInvalid={
          formik.errors.confirmPassword && formik.touched.confirmPassword
            ? true
            : false
        }
        feedback={
          formik.errors.confirmPassword && formik.touched.confirmPassword
            ? formik.errors.confirmPassword
            : null
        }
      />
      <div className={styles.buttons}>
        <button className="custom-b" type="submit">
          Create Account
        </button>
      </div>
      <div className={styles.footer}>
        <span>
          Already have an account? <Link to="/login">Login</Link>
        </span>
      </div>
    </Form>
  );
}
