import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useLoadingContext } from "react-router-loading";
import AnimatedPage from "../../components/AnimatedPage";
import Footer from "../../components/Footer";
import Topbar from "../../components/Topbar";
import Main from "./Main";
export default function Learning() {
  const { state } = useLocation();
  const loadingContext = useLoadingContext();
  useEffect(() => {
    loadingContext.done();
  }, []);

  return (
    <AnimatedPage>
      <Topbar />
      <Main item={state} />
      <Footer />
    </AnimatedPage>
  );
}
