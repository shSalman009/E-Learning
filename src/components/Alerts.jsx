import { Alert } from "react-bootstrap";
import { useCart } from "../context/CartContext";
import styles from "../styles/Alerts.module.css";

export default function Alerts() {
    const { addAlert, removeAlert, changeAlert, removeAllALert } = useCart();

    return (
        <div className={styles.alertWrapper}>
            {addAlert && (
                <Alert variant="success">Add Item in Cart Successfully!</Alert>
            )}
            {removeAlert && (
                <Alert variant="success">
                    Remove Item from Cart Successfully!
                </Alert>
            )}
            {changeAlert && (
                <Alert variant="success">Edit Saved Successfully!</Alert>
            )}
            {removeAllALert && (
                <Alert variant="success">
                    Removed All Items from Cart successfully!
                </Alert>
            )}
        </div>
    );
}
