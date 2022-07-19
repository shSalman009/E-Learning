import { useEffect, useState } from "react";
import { useCart } from "../../context/CartContext";
import CartDetails from "./CartDetails";
import CartItem from "./CartItem";
import styles from "./styles/Main.module.css";

export default function Main() {
    const [totalPrice, setTotalPrice] = useState(0);

    const {
        handleClearCart,
        cartItems,
        handleRemoveCart,
        increment,
        decrement,
    } = useCart();

    useEffect(() => {
        setTotalPrice(cartItems.reduce((a, b) => a + b.price * b.qty, 0));
    }, [cartItems]);
    return (
        <div className={styles.cartItem}>
            <div className="container">
                <div className={styles.main}>
                    <div className={styles.cartItems}>
                        <div className={styles.head}>
                            <h3>Shopping Cart</h3>
                        </div>

                        {cartItems && cartItems.length > 0 ? (
                            cartItems.map((item) => {
                                return (
                                    <CartItem
                                        key={item.id}
                                        item={item}
                                        increment={increment}
                                        decrement={decrement}
                                        handleRemoveCart={handleRemoveCart}
                                    />
                                );
                            })
                        ) : (
                            <div className={styles.notFound}>
                                <h4>Not Added</h4>
                            </div>
                        )}

                        <div className={styles.updateButton}>
                            <button
                                disabled={!cartItems.length > 0}
                                type="button"
                                onClick={() => {
                                    handleClearCart(true);
                                }}
                                className="custom-b"
                            >
                                remove all
                            </button>
                        </div>
                    </div>
                    <CartDetails
                        totalPrice={totalPrice}
                        cartItems={cartItems}
                    />
                </div>
            </div>
        </div>
    );
}
