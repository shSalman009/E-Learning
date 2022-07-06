import { Link } from "react-router-dom";
import styles from "./styles/CartDetails.module.css";

export default function CartDetails({ totalPrice, cartItems }) {
    return (
        <div className={styles.details}>
            <div className={styles.detailsHead}>
                <h3>Cart Totals</h3>
            </div>

            <div className={styles.subtotal}>
                <h4>Subtotal</h4>
                <h4>${totalPrice}.00</h4>
            </div>

            <div className={styles.total}>
                <h4>Total</h4>
                <h4>${totalPrice}.00</h4>
            </div>
            <div className={styles.subButton}>
                <Link to="/payment" state={{ products: cartItems }}>
                    <button
                        disabled={!cartItems.length > 0}
                        className="custom-b"
                    >
                        Procced to Checkout
                    </button>
                </Link>
            </div>
        </div>
    );
}
