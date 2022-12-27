import React, { useEffect } from "react";
import { useLoadingContext } from "react-router-loading";
import Footer from "../../components/Footer";
import Topbar from "../../components/Topbar";
import Main from "./Main";

export default function YourCourse() {
  const loadingContext = useLoadingContext();
  useEffect(() => {
    loadingContext.done();
  }, []);
  return (
    <>
      <Topbar />
      <Main />
      <Footer />
    </>
  );
}
