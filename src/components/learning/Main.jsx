import React from "react";
import Content from "./Content";
import LearnPath from "./LearnPath";
import styles from "./styles/main.module.css";

export default function Main({ item }) {
    console.log(item);

    return (
        <div className={styles.main}>
            <div className={styles.left}>
                <LearnPath path={item.content} />
            </div>
            <div className={styles.right}>
                <Content content={item.img} />
            </div>
        </div>
    );
}
