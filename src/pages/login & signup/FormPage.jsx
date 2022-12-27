import React from "react";
import { useLocation } from "react-router-dom";
import Topbar from "../../components/Topbar";
import Login from "./LogIn";
import SignUp from "./SignUp";
import styles from "./styles/FormPage.module.css";

export default function FormPage() {
  const location = useLocation();
  const path = location.pathname.split("/").pop();

  return (
    <>
      <Topbar />
      <div className={styles.main}>
        <div className={styles.formWrapper}>
          <div className={styles.left}>
            {path === "login" ? <Login /> : path === "signup" && <SignUp />}
          </div>
          <div className={styles.right}>
            <h2>Welcome!</h2>
            <p>
              Join E-Learning and meet with our best courses. here you can find
              your favorite courses to complete your goal. and here you can
              enroll some of courses for free.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
