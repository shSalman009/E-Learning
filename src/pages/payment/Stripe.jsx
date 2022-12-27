import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useEffect, useState } from "react";
import OrderSummery from "./OrderSummery";
import PaymentForm from "./PaymentForm";

const stripePromise = loadStripe(
    `${process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY}`
);

export default function Stripe({ cartItems, oneItems, back }) {
    const [total, setTotal] = useState(0);

    useEffect(() => {
        const generateTotal = () => {
            setTotal(0);
            cartItems &&
                cartItems.forEach((item) => {
                    setTotal((prev) => prev + Number(item.price * item.qty));
                });
        };
        cartItems && generateTotal();
    }, [cartItems]);

    return (
        <>
            <OrderSummery
                cartItems={cartItems}
                oneItems={oneItems}
                total={total}
            />

            <Elements stripe={stripePromise}>
                <PaymentForm
                    oneItems={oneItems}
                    back={back}
                    clearCart={cartItems ? true : false}
                    price={cartItems ? total : oneItems && oneItems.price}
                />
            </Elements>
        </>
    );
}
