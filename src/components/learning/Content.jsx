import React from "react";
import styles from "./styles/content.module.css";

export default function Content({ content }) {
    return (
        <div className={styles.content}>
            <h2>Congratulatins!</h2>
            <h4>You have learned a lot</h4>
            <img src={content} alt="" />
        </div>
    );
}
