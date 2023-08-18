import { useEffect } from "react";
import { useLoadingContext } from "react-router-loading";
import Main from "../components/cart/Main";
import Footer from "../components/Footer";
import Topbar from "../components/Topbar";

export default function CartPage() {
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
