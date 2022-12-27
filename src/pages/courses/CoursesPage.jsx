import { useEffect } from "react";
import { useLoadingContext } from "react-router-loading";
import AnimatedPage from "../../components/AnimatedPage";
import Footer from "../../components/Footer";
import Topbar from "../../components/Topbar";
import Main from "./Main";
import Slider from "./Slider";

export default function CoursesPage() {
  const loadingContext = useLoadingContext();

  useEffect(() => {
    loadingContext.done();
  }, []);

  return (
    <AnimatedPage>
      <Topbar />
      <Slider />
      <Main />
      <Footer />
    </AnimatedPage>
  );
}
