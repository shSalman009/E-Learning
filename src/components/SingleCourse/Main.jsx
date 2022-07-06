import Description from "./Description";
import Pricing from "./Pricing";
import styles from "./styles/Main.module.css";

export default function Main({ course }) {
    return (
        <div>
            <div className="container">
                <div className={styles.main}>
                    <Description course={course} />
                    <Pricing course={course} />
                </div>
            </div>
        </div>
    );
}
