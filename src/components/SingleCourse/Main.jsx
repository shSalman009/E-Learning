import Description from "./Description";
import Pricing from "./Pricing";
import styles from "./styles/Main.module.css";

export default function Main({ course, carted, purchased }) {
  return (
    <div>
      <div className="container">
        <div className={styles.main}>
          <Description course={course} purchased={purchased} />
          <Pricing course={course} carted={carted} purchased={purchased} />
        </div>
      </div>
    </div>
  );
}
