import { IoClose } from "react-icons/io5";

import styles from "./styles/CartItem.module.css";

export default function CartItem({ item, handleRemoveCart }) {
    return (
        <div className={styles.item}>
            <div className={styles.one}>
                <div className={styles.iconWrapper}>
                    <button
                        onClick={() => {
                            handleRemoveCart(item, true);
                        }}
                    >
                        <IoClose size={30} />
                    </button>
                </div>
                <div className={styles.imgWrapper}>
                    <img src={item.img} alt="" />
                </div>
            </div>
            <div className={styles.two}>
                <div className={styles.titleWrapper}>
                    <p>{item.title}</p>
                </div>

                <div className={styles.threeWrapper}>
                    <div className={styles.priceWrapper}>
                        <p>${item.price}.00</p>
                    </div>
                    <div className={styles.subTotalWrapper}>
                        <h4>${item.price * item.qty}.00</h4>
                    </div>
                </div>
            </div>
        </div>
    );
}
