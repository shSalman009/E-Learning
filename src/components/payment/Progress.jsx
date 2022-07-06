import styles from "./styles/Progress.module.css";

export default function Progress() {
    return (
        <div className={styles.progress}>
            <div className={styles.wrapper}>
                <div className={styles.item}>
                    <p className={styles.one}>user Information</p>
                    <span>0</span>
                </div>
                <div className={styles.step}></div>
                <div className={styles.item}>
                    <p className={styles.two}>Payment Details</p>
                    <span>1</span>
                </div>
            </div>
        </div>
    );
}
