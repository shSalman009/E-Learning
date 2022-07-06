import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Progress from "../components/payment/Progress";
import Stripe from "../components/payment/Stripe";
import styles from "../components/payment/styles/Checkout.module.css";
import UserForm from "../components/payment/UserForm";

export default function Checkout() {
    const [goNext, setGoNext] = useState(0);

    const [cartItems, setCartItems] = useState(null);
    const [oneItems, setOneItems] = useState(null);

    const { state } = useLocation();

    const next = () => {
        setGoNext(1);
    };
    const back = () => {
        setGoNext(0);
    };

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
        <div className={styles.checkout}>
            <div className={styles.head}>
                <h4>Checkout</h4>

                <Progress />
            </div>

            {goNext === 0 ? (
                <UserForm next={next} />
            ) : (
                <Stripe back={back} cartItems={cartItems} oneItems={oneItems} />
            )}
        </div>
    );
}
