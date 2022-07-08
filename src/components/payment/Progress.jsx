import { ProgressBar } from "react-bootstrap";
import styles from "./styles/Progress.module.css";

export default function Progress({ length }) {
    const count = length === 0 ? 50 : length === 1 && 100;

    return (
        <div className={styles.progress}>
            <ProgressBar variant="success" now={count} label={`${count}%`} />
        </div>
    );
}
