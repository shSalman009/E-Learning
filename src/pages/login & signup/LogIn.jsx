import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { Alert, Form, FormControl, FormGroup } from "react-bootstrap";
import Feedback from "react-bootstrap/esm/Feedback";
import { Link, useNavigate } from "react-router-dom";
import { useLoadingContext } from "react-router-loading";
import * as yup from "yup";
import { useAuth } from "../../context/AuthContext";
import styles from "./styles/FormPage.module.css";

export default function Login() {
  const [fail, setFail] = useState(null);

  const { login, loading } = useAuth();

  const navigate = useNavigate();

  const loadingContext = useLoadingContext();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: yup.object({
      email: yup
        .string()
        .email("Provide a valid email")
        .required("email is required"),
      password: yup.string().required("password is required"),
    }),
    onSubmit: async (values) => {
      try {
        setFail(null);
        await login(values.email, values.password);
        navigate("/");
      } catch (err) {
        setFail(err.message);
      }
    },
  });

  useEffect(() => {
    loadingContext.done();
  }, []);

  return (
    <Form className={styles.form} onSubmit={formik.handleSubmit}>
      <h2 className="my-4">Login Here</h2>
      {fail && <Alert variant="warning">{fail.slice(10)}</Alert>}
      <FormGroup className="my-3">
        <FormControl
          type="email"
          name="email"
          placeholder={`Enter your email`}
          value={formik.values.email}
          onChange={formik.handleChange}
          isInvalid={formik.errors.email && formik.touched.email ? true : false}
        />
        <Feedback type="invalid">
          {formik.errors.email && formik.touched.email
            ? formik.errors.email
            : null}
        </Feedback>
      </FormGroup>
      <FormGroup className="my-3">
        <FormControl
          type="password"
          name="password"
          placeholder={`Enter your password`}
          value={formik.values.password}
          onChange={formik.handleChange}
          isInvalid={
            formik.errors.password && formik.touched.password ? true : false
          }
        />
        <Feedback type="invalid">
          {formik.errors.password && formik.touched.password
            ? formik.errors.password
            : null}
        </Feedback>
      </FormGroup>
      <div className={styles.buttons}>
        <button className="custom-b" type="submit">
          Login
        </button>
      </div>
      <div className={styles.footer}>
        <span>
          Don't have accout? <Link to="/signup">Sign Up</Link>
        </span>
      </div>
    </Form>
  );
}
