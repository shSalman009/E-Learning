import { useEffect } from "react";
import { useLoadingContext } from "react-router-loading";
import AnimatedPage from "../../components/AnimatedPage";
import Footer from "../../components/Footer";
import Topbar from "../../components/Topbar";
import Main from "./Main";

export default function TeachersPage() {
  const loadingContext = useLoadingContext();

  useEffect(() => {
    loadingContext.done();
  }, []);
  return (
    <AnimatedPage>
      <Topbar />
      <Main />
      <Footer />
    </AnimatedPage>
  );
}
