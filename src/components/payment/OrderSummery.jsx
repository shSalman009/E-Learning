import { ListGroup } from "react-bootstrap";
import styles from "./styles/OrderSummery.module.css";

export default function OrderSummery({ cartItems, oneItems, total }) {
    const itemTitle = {
        display: "-webkit-box",
        WebkitLineClamp: "2",
        WebkitBoxOrient: "vertical",
        overflow: "hidden",
        textOverflow: "ellipsis",
    };

    return (
        <div className={styles.summery}>
            <h4 className="head">
                <p className="head-1">Order</p>
                <p className="head-2">Summery</p>
            </h4>
            <ListGroup className={styles.orders}>
                {cartItems &&
                    cartItems.map((item) => (
                        <ListGroup.Item
                            key={item.id}
                            className="d-flex justify-content-between align-items-center mb-2"
                        >
                            <div style={{ textAlign: "left" }}>
                                <p style={itemTitle} className="lead">
                                    {item.title}
                                </p>
                                <p>Quantity : {item.qty}</p>
                            </div>
                            <h4>${item.price * item.qty}.00</h4>
                        </ListGroup.Item>
                    ))}
            </ListGroup>
            {oneItems && (
                <ListGroup>
                    <ListGroup.Item className="d-flex justify-content-between align-items-center">
                        <p className="lead">{oneItems.title}</p>
                        <h4>${oneItems.price}.00</h4>
                    </ListGroup.Item>
                </ListGroup>
            )}

            {cartItems && total > 0 && (
                <ListGroup.Item className="my-4 py-4" variant="danger">
                    <div className={styles.total}>
                        <h4>Total</h4>
                        <h4>${total}.00</h4>
                    </div>
                </ListGroup.Item>
            )}
        </div>
    );
}
