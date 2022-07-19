import React from "react";
import { usePurchase } from "../../context/PurchaseContext";
import Item from "./Item";
import styles from "./styles/main.module.css";

export default function Main() {
    const { purchaseItems } = usePurchase();

    return (
        <div className="container">
            <div className={styles.main}>
                <div className={styles.head}>
                    <h4>Your Purchased Courses</h4>
                </div>
                <div className={styles.items}>
                    {purchaseItems.map((item) => (
                        <Item key={item.id} item={item} />
                    ))}
                </div>
            </div>
        </div>
    );
}
