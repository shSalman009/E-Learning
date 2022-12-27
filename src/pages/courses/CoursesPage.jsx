import { useEffect } from "react";
import { useLoadingContext } from "react-router-loading";
import Slider from "./Slider";
import Footer from "../../components/Footer";
import Topbar from "../../components/Topbar";
import Main from "./Main";

export default function CoursesPage() {
  const loadingContext = useLoadingContext();

  useEffect(() => {
    loadingContext.done();
  }, []);

  return (
    <>
      <Topbar />
      <Slider />
      <Main />
      <Footer />
    </>
  );
}
