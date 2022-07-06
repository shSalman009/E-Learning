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
        removeCartItem,
        increment,
        decrement,
        handleSaveEdit,
        handleCancelEdit,
        isChange,
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
                                        removeCartItem={removeCartItem}
                                    />
                                );
                            })
                        ) : (
                            <div className={styles.notFound}>
                                <h4>Cart item is not here</h4>
                            </div>
                        )}

                        <div className={styles.updateButton}>
                            <button
                                style={{
                                    display: `${isChange ? "none" : "block"}`,
                                }}
                                disabled={!cartItems.length > 0}
                                type="button"
                                onClick={() => {
                                    handleClearCart(true);
                                }}
                                className="custom-b"
                            >
                                remove all
                            </button>
                            <button
                                style={{
                                    display: `${isChange ? "block" : "none"}`,
                                }}
                                onClick={handleCancelEdit}
                                type="button"
                                className="custom-b"
                            >
                                Cancel Change
                            </button>
                            <button
                                style={{
                                    display: `${isChange ? "block" : "none"}`,
                                }}
                                onClick={handleSaveEdit}
                                type="button"
                                className="custom-b"
                            >
                                Add Change
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
