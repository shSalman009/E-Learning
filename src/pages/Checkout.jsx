import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Stripe from "../components/payment/Stripe";
import styles from "../components/payment/styles/Checkout.module.css";
import Topbar from "../components/Topbar";

export default function Checkout() {
    const [cartItems, setCartItems] = useState(null);
    const [oneItems, setOneItems] = useState(null);

    const { state } = useLocation();

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
        <>
            <Topbar />
            <div className={styles.checkout}>
                <div className={styles.wrapper}>
                    <div className={styles.head}>
                        <h4>Checkout</h4>
                    </div>

                    <Stripe cartItems={cartItems} oneItems={oneItems} />
                </div>
            </div>
        </>
    );
}
