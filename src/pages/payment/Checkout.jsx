import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useLoadingContext } from "react-router-loading";
import AnimatedPage from "../../components/AnimatedPage";
import Topbar from "../../components/Topbar";
import Stripe from "./Stripe";
import styles from "./styles/Checkout.module.css";

export default function Checkout() {
  const [cartItems, setCartItems] = useState(null);
  const [oneItems, setOneItems] = useState(null);

  const { state } = useLocation();
  const loadingContext = useLoadingContext();
  useEffect(() => {
    loadingContext.done();
  }, []);

  useEffect(() => {
    if (state) {
      const isArray = Array.isArray(state.products);
      if (isArray) {
        setCartItems(state.products);
      } else {
        const isObj = typeof state.products === "object";
        isObj && setOneItems(state.products);
      }
    }
  }, [state]);

  return (
    <AnimatedPage>
      <Topbar />
      <div className={styles.checkout}>
        <div className={styles.wrapper}>
          <div className={styles.head}>
            <h4>Checkout</h4>
          </div>

          <Stripe cartItems={cartItems} oneItems={oneItems} />
        </div>
      </div>
    </AnimatedPage>
  );
}
