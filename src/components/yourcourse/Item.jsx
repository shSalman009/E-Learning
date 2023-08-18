import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./styles/item.module.css";

export default function Item({ item }) {
    const navigate = useNavigate();

    return (
        <div className={styles.item}>
            <div className={styles.imgWrapper}>
                <img src={item.img} alt="" />
            </div>

            <div className={styles.body}>
                <div className={styles.left}>
                    <h4>{item.category}</h4>
                    <h5>{item.title}</h5>
                </div>
                <div className={styles.progress}>
                    <span>00%</span>
                </div>
            </div>

            <button onClick={() => navigate("/learning", { state: item })}>
                Start Learning
            </button>
        </div>
    );
}
