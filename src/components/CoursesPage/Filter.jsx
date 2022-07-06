import { useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import styles from "./styles/Filter.module.css";

export default function Filter({
    categories,
    handleCategory,
    handlePrice,
    filter,
}) {
    const [categoryOpen, setCategoryOpen] = useState(true);
    const [priceOpen, setPriceOpen] = useState(true);

    const types = ["all", "free", "paid"];

    return (
        <div className={styles.filter}>
            <div className={styles.category}>
                <div className={styles.head}>
                    <h4>Category</h4>
                    <div
                        className={styles.toggleBtn}
                        onClick={() => {
                            setCategoryOpen(!categoryOpen);
                        }}
                    >
                        {!categoryOpen && <IoIosArrowDown size={30} />}
                        {categoryOpen && <IoIosArrowUp size={30} />}
                    </div>
                </div>

                <ul style={{ display: `${categoryOpen ? "flex" : "none"}` }}>
                    {categories.map((item) => (
                        <li key={item.id}>
                            <input
                                checked={
                                    filter.includes(item.category)
                                        ? true
                                        : false
                                }
                                type="checkbox"
                                onChange={() => {
                                    handleCategory(item.category);
                                }}
                            />
                            <label>{item.category}</label>
                        </li>
                    ))}
                </ul>
            </div>
            <div className={styles.price}>
                <div className={styles.head}>
                    <h4>Price</h4>
                    <div
                        className={styles.toggleBtn}
                        onClick={() => {
                            setPriceOpen(!priceOpen);
                        }}
                    >
                        {!priceOpen && <IoIosArrowDown size={30} />}
                        {priceOpen && <IoIosArrowUp size={30} />}
                    </div>
                </div>

                <div
                    className={styles.inputs}
                    style={{ display: `${priceOpen ? "flex" : "none"}` }}
                >
                    {types.map((item) => (
                        <div key={item}>
                            <input
                                onChange={() => {
                                    handlePrice(item);
                                }}
                                type="radio"
                                name="price"
                            />
                            <label>{item}</label>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
