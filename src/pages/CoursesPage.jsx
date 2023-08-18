import { useEffect } from "react";
import { useLoadingContext } from "react-router-loading";
import Main from "../components/CoursesPage/Main";
import Slider from "../components/CoursesPage/Slider";
import Footer from "../components/Footer";
import Topbar from "../components/Topbar";

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
