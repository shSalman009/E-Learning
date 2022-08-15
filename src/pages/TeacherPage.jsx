import { useEffect } from "react";
import { useLoadingContext } from "react-router-loading";
import Footer from "../components/Footer";
import Main from "../components/teacher/Main";
import Topbar from "../components/Topbar";

export default function TeachersPage() {
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
