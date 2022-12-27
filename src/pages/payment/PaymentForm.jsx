import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { usePurchase } from "../../context/PurchaseContext";
import styles from "./styles/PaymentForm.module.css";

export default function PaymentForm({ clearCart, price, back, oneItems }) {
    const [success, setSuccess] = useState(false);

    const { handleClearCart, cartItems } = useCart();
    const { addCartPurchase, addSinglePurchase } = usePurchase();

    const stripe = useStripe();
    const elements = useElements();

    const navigate = useNavigate();

    const CARD_OPTIONS = {
        iconStyle: "solid",
        style: {
            base: {
                iconColor: "#c4f0ff",
                color: "#fff",
                fontWeight: 500,
                fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
                fontSize: "16px",
                fontSmoothing: "antialiased",
                ":-webkit-autofill": { color: "#fce883" },
                "::placeholder": { color: "#87bbfd" },
            },
            invalid: {
                iconColor: "#ffc7ee",
                color: "#ffc7ee",
            },
        },
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: "card",
            card: elements.getElement(CardElement),
        });

        if (!error) {
            try {
                if (clearCart) {
                    await addCartPurchase(cartItems);
                    handleClearCart(false);
                } else {
                    addSinglePurchase(oneItems);
                }

                setSuccess(true);
            } catch (err) {
                console.log(err);
            }
        }
    };

    return (
        <div>
            {!success ? (
                <form onSubmit={handleSubmit}>
                    <div className={styles.FormGroup}>
                        <CardElement options={CARD_OPTIONS} />
                    </div>
                    <div className={styles.buttons}>
                        <button
                            className="custom-b"
                            type="button"
                            onClick={back}
                        >
                            Back
                        </button>

                        <button className="custom-b" type="submit">
                            Pay ${price}.00
                        </button>
                    </div>
                </form>
            ) : (
                <div className={styles.success}>
                    <h2>Congratulatins!</h2>
                    <h4>You have purchased successfully</h4>
                    <button className="custom-b" onClick={() => navigate("/")}>
                        Go Home
                    </button>
                </div>
            )}
        </div>
    );
}
