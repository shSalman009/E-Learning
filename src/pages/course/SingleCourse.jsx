import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useLoadingContext } from "react-router-loading";
import Footer from "../../components/Footer";
import Slider from "../../components/Slider";
import Topbar from "../../components/Topbar";
import { useCart } from "../../context/CartContext";
import { usePurchase } from "../../context/PurchaseContext";
import Main from "./Main";

export default function SingleCourse() {
  const [carted, setCarted] = useState(false);
  const [purchased, setPurchased] = useState(false);

  const loadingContext = useLoadingContext();
  const { state } = useLocation();
  const { cartItems } = useCart();
  const { purchaseItems } = usePurchase();

  useEffect(() => {
    purchaseItems.forEach((item) => {
      if (item.id === state.course.id) {
        setPurchased(true);
      }
    });

    cartItems.forEach((item) => {
      if (item.id === state.course.id) {
        setCarted(true);
      }
    });
  }, [cartItems, state, purchaseItems]);
  useEffect(() => {
    loadingContext.done();
  }, []);
  return (
    <>
      <Topbar />
      <Slider />
      <Main carted={carted} course={state.course} purchased={purchased} />
      <Footer />
    </>
  );
}
